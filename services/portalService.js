/**
 * Created by kelvin on 11/16/15.
 */
angular.module("hmisPortal")
   .service('portalService',function($http,$resource,mapService) {

        var self = this;
        //initializing shared data
        this.periodType = 'year';
        this.period = '';
        this.orgUnitId = '';
        this.orgUnitName = '';
        this.numerator='';
        this.denominator='';
        this.indicatorType='';
        this.header='';
        this.base = "https://hmisportal.moh.go.tz/dhis/";
        this.icons = [
            {name: 'table', image: 'table.jpg', action: ''},
            {name: 'bar', image: 'bar.png', action: ''},
            {name: 'line', image: 'line.png', action: ''},
            {name: 'combined', image: 'combined.jpg', action: ''},
            {name: 'column', image: 'column.png', action: ''},
            {name: 'area', image: 'area.jpg', action: ''},
            {name: 'pie', image: 'pie.png', action: ''},
            {name: 'map', image: 'map.jpg', action: ''}
        ];
        self.chartObject = {
            title: {
                text: ''
            },
            xAxis: {
                categories: [],
                labels: {
                    rotation: -90,
                    style: { "color": "#000000", "fontWeight": "normal" }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                }, labels: {
                    style: { "color": "#000000", "fontWeight": "bold" }
                }
            },
            labels: {
                items: [
                    {
                        html: 'doses',
                        style: {
                            left: '50px',
                            top: '18px',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                        }
                    }
                ]
            },
            series: []
        };

        this.authenticateDHIS = function () {
            var promise = $.post( self.base + "dhis-web-commons-security/login.action?authOnly=true", {
                j_username: "portal", j_password: "Portal123"
            },function(response){
                console.log(response);
            });


//             $http.post(  + "dhis-web-commons-security/login.action?authOnly=true", {
//                j_username: "portal", j_password: "Portal123"
//            }).then(function (response) {
//                // The then function here is an opportunity to modify the response
//                console.log(response);
//                // The return value gets picked up by the then in the controller.
//            });
            // Return the promise to the controller
            return promise;
        }

        this.prepareData = function (jsonObject) {
            var data = [];
            data.push({'name': jsonObject.metaData.names[self.orgUnitId], 'id': self.orgUnitId, 'value': getDataFromUrl(jsonObject.rows, self.orgUnitId)});

            angular.forEach(jsonObject.metaData.ou, function (region) {
                if (region != self.orgUnitId) {
                    data.push({'name': jsonObject.metaData.names[region], 'id': region, 'value': getDataFromUrl(jsonObject.rows, region)});
                }
            });
            return data;
        };

        this.downloadExcel = function (id) {
            self.authenticateDHIS().then(function () {
                var url = "";
                if (self.selectedOrgUnit == "m0frOspS7JY") {
                    url = "https://hmisportal.moh.go.tz/dhis/api/analytics.csv?dimension=dx:" + id + "&dimension=pe:" + self.period + "&dimension=ou:LEVEL-1;LEVEL-2;" + self.orgUnitId + "&displayProperty=NAME&tableLayout=true&columns=dx&rows=pe;ou";
                } else {
                    url = "https://hmisportal.moh.go.tz/dhis/api/analytics.csv?dimension=dx:" + id + "&dimension=pe:" + self.period + "&dimension=ou:LEVEL-2;LEVEL-3;" + self.orgUnitId + "&displayProperty=NAME&tableLayout=true&columns=dx&rows=pe;ou";
                }
                $http.get(url,{'Content-Type': 'application/csv;charset=UTF-8'}).success(function (data) {
                    var a = document.createElement('a');
                    var blob = new Blob([data]);
                    a.href = window.URL.createObjectURL(blob);
                    a.download = "data.csv";
                    a.click();
                }
                );
            });
        };
        this.drawMap = function (baseUrl,orgUnit, level,card,cardtitle,valueTouseArray) {
            mapService.renderMap(baseUrl,orgUnit, level, card,cardtitle,valueTouseArray);

        }

        this.prepareSeries = function (cardObject, chart) {
            cardObject.chartObject.loading = true;
            self.authenticateDHIS().then(function () {
                if (chart == 'table') {
                    cardObject.displayTable = true;
                    cardObject.displayMap = false;
                } else if (chart == 'map') {
                    cardObject.displayMap = true;
                    cardObject.displayTable = false;
                }
                else {
                    cardObject.displayMap = false;
                    cardObject.displayTable = false;
                }
                cardObject.chartObject.title.text = cardObject.title;
                cardObject.chartObject.yAxis.title.text = cardObject.title.toLowerCase();

                var url = '';
//                var url = '/analytics.json';
                if (self.orgUnitId == "m0frOspS7JY") {
                    url = "https://hmisportal.moh.go.tz/dhis/api/analytics.json?dimension=dx:"+cardObject.data+"&dimension=ou:LEVEL-1;LEVEL-2;m0frOspS7JY&filter=pe:"+self.period+"&displayProperty=NAME";
                } else {
                    url = "https://hmisportal.moh.go.tz/dhis/api/analytics.json?dimension=dx:"+cardObject.data+"&dimension=ou:LEVEL-2;LEVEL-3;"+self.orgUnitId+"&filter=pe:"+self.period+"&displayProperty=NAME";
                }
                cardObject.chartObject.loading = true;
                $http.get(url).success(function (data) {
                       cardObject.header=data.metaData.names[cardObject.data];
                    var indicatorApi=
                        $resource("https://hmisportal.moh.go.tz/dhis/api/indicators/"+cardObject.data+".json");
                        var indicatorResult=indicatorApi.get(function(indicatorObject){
                            cardObject.indicatorType=indicatorObject.indicatorType.name;
                            var expApi=
                            $resource('https://hmisportal.moh.go.tz/dhis/api/expressions/description',{get:{method:"JSONP"}});
                             var numeratorExp=expApi.get({expression:indicatorObject.numerator},function(numeratorText){
                               cardObject.numerator=numeratorText.description;
                             });
                             var denominator=expApi.get({expression:indicatorObject.denominator},function(denominatorText){
                                 cardObject.denominator=denominatorText.description;
                             });
                        });
                    var area = [];
                    cardObject.chartObject.xAxis.categories = [];
                    //
                    if (typeof data === 'object') {
                        var dataToUse = self.prepareData(data);
                        console.log(dataToUse)
                        //
                        angular.forEach(dataToUse, function (val) {
                            cardObject.chartObject.xAxis.categories.push(val.name);
                        });
                        var normalseries = [];
                        if (chart == "pie") {
                            delete cardObject.chartObject.chart;
                            var serie = [];
                            angular.forEach(dataToUse, function (val) {
                                serie.push({name: val.name, y: parseInt(val.value)})
                            });
                            normalseries.push({type: chart, name: cardObject.title, data: serie, showInLegend: true,
                                dataLabels: {
                                    enabled: false
                                } });
                            cardObject.chartObject.series = normalseries;
                        }
                        else if (chart == "combined") {
                            delete cardObject.chartObject.chart;
                            var serie1 = [];
                            var serie = [];

                            angular.forEach(dataToUse, function (val) {
                                serie.push(parseInt(val.value));
                                serie1.push({name: val.name, y: parseInt(val.value) })
                            });
                            normalseries.push({type: 'column', name: cardObject.title, data: serie});
                            normalseries.push({type: 'spline', name: cardObject.title, data: serie});
                            normalseries.push({type: 'pie', name: cardObject.title, data: serie1, center: [100, 80], size: 150, showInLegend: false,
                                dataLabels: {
                                    enabled: false
                                }});
                            cardObject.chartObject.series = normalseries;
                        }
                        else if (chart == 'table') {
                            cardObject.table = {};
                            cardObject.table.colums = [];
                            angular.forEach(dataToUse, function (val) {
                                cardObject.table.colums.push({name: val.name, value: parseInt(val.value)});
                            });
                        } else if (chart == 'map') {
                            console.log(dataToUse);
                            if (self.orgUnitId == "m0frOspS7JY") {
                                self.drawMap(self.base,self.orgUnitId,2,cardObject,cardObject.title,dataToUse);
                            } else {
                                self.drawMap(self.base,self.orgUnitId, 3, cardObject,cardObject.title,dataToUse);
                            }
                        }
                        else {
                            delete cardObject.chartObject.chart;
                            var serie = [];
                            angular.forEach(dataToUse, function (val) {
                                serie.push(val.value);
                            });
                            cardObject.chartObject.chart = {};
                            cardObject.chartObject.chart.type = chart;
                            normalseries.push({type: chart, name: cardObject.title, data: serie});
                            cardObject.chartObject.series = normalseries;
                        }


                        cardObject.chartObject.loading = false
                    }

                });
            });

        };


    })
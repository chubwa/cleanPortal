/**
 * Created by mahane on 1/6/16.
 */

angular.module("hmisPortal")
    .config(function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    })
    .controller("cervicalCancerCtrl",function ($rootScope,$scope,$http,$location,$timeout,olData,olHelpers,shared,portalService) {
        //displaying loading during page change
        $rootScope.$on("$routeChangeStart",
            function (event, current, previous, rejection) {
                $rootScope.showLoader = true;
            });
        $rootScope.$on("$routeChangeSuccess",
            function (event, current, previous, rejection) {
                $rootScope.showLoader = false
            });
        $scope.cards = {};
        $scope.data = {};
        var map = this;
        $rootScope.periodType = 'years';
        portalService.orgUnitId = $rootScope.selectedOrgUnit;
        portalService.period = $rootScope.selectedPeriod;
        $scope.selectedOrgUnitLevel = "2";

        $scope.cards.malaria = [
            {
                title:'Clients who received VIA screening',
                description:'Maelezo ya Clients who received VIA screening',
                cardClass:"col s12 m6",
                data:'jbZa8J1H2ET',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'Clients with Positive VIA results',
                description:'Maelezo ya Clients with Positive VIA results',
                cardClass:"col m6 s12",
                cardSize:"medium",
                data:'TMXGiqmTZ3M',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'line',
                chartObject:angular.copy(portalService.chartObject)

            },
            {
                title:'Clients with VIA positive results treated with cryotherapy on the same day',
                description:'Clients with VIA positive results treated with cryotherapy on the same day',
                cardClass:"col m12 s12",
                data:'BQLLzTvEHBL',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'combined',
                chartObject:angular.copy(portalService.chartObject)

            },
            {
                title:'Total number of VIA+ clients receiving cryotherapy',
                description:'Total number of VIA+ clients receiving cryotherapy',
                cardClass:"col m6 s12",
                data:'UCKrT4buBRQ',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)

            },
            {
                title:'Women with positive VIA results referred for suspect with cancer',
                description:'Women with positive VIA results referred for suspect with cancer',
                cardClass:"col m6 s12",
                data:'fHEmmGUV9Wc',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'Waliopewa Huduma ya Cryotherapy',
                description:'Waliopewa Huduma ya Cryotherapy',
                cardClass:"col m6 s12",
                data:'bZCT8NgyVw0',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'Number of clients with LEEP treatment performed',
                description:'Number of clients with LEEP treatment performed',
                cardClass:"col m6 s12",
                data:'ulM6a7dZoXM',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'Number of post-treatment complications (cryotherapy or LEEP)',
                description:'Number of post-treatment complications (cryotherapy or LEEP)',
                cardClass:"col m6 s12",
                data:'MkNGtEtobp1',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'Waliodhaniwa Kuwa na Saratani ya Shingo ya Mfuko wa Kizazi wakati wa FP',
                description:'Waliodhaniwa Kuwa na Saratani ya Shingo ya Mfuko wa Kizazi wakati wa FP',
                cardClass:"col m6 s12",
                data:'IZgTEU5SD0H',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            }
        ]


        $scope.data.chartType = 'column';
        $scope.displayTable = false;
        $scope.changeChart = function(type,card){
            card.displayTable = false;

            $scope.showReport = true;
            if(type == 'table'){
                card.displayTable = true;
                card.displayMap = false;
                card.chart = 'table';
                $scope.data.chartType = 'table';
            }else if(type == 'map'){
                card.displayMap = true;
                card.displayTable = false;
                card.chart = 'map';
                $scope.data.chartType = 'map';
            }
            else{
                card.displayMap = false;
                card.displayTable = false;
                card.chart = type;
                $scope.data.chartType = type;
            }
            portalService.orgUnitId = $rootScope.selectedOrgUnit;
            portalService.period = $rootScope.selectedPeriod;
            portalService.prepareSeries(card,$scope.data.chartType);
        };

        $scope.downloadExcel = function(id){
            portalService.downloadExcel(id);
        };




        $rootScope.firstClick = function(){
            portalService.orgUnitId = $rootScope.selectedOrgUnit;
            portalService.period = $rootScope.selectedPeriod;
            angular.forEach($scope.cards.malaria,function(value){
                portalService.prepareSeries(value,value.chart);
            });

        }
        $scope.firstClick();




    })


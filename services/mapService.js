angular.module("hmisPortal")
.service('mapService',['$rootScope','$http','olData','olHelpers','shared',function($scope,$http,olData,olHelpers,shared){

    var map = this;
    map.renderMap = function(baseUrl,parentUid,level,card,valueTouseArray){
        localStorage.clear();
        var cardseries = removeDuplicatesInSeries( card.chartObject.series );
        var max_and_min = getMaxAndMin(cardseries);
        var legend = getLegend(max_and_min);
        card.legend = legend;
        map.shared = shared;
        shared.facility =3029;
        var url = baseUrl+'api/organisationUnits.geojson?parent='+parentUid+'&level='+level;
        card.chartObject.loading = true;
            $http.get(url,{withCredentials: true, params : {
                j_username: "portal", j_password: "Portal123"
            }
            }).success(
            function(data) {
                card.chartObject.loading = false;
                var TotalGeo = {
                    "type":"FeatureCollection",
                    "features":[]
                };
                var districtProperties = [];
                var dateObject = new Date();
                card.thisyear = dateObject.getFullYear();
                card.districts = {};
                card.DistrictFreeObject = [];
                angular.forEach(data.features, function (value, index) {
                    var appropiateColor = decideOnColor(max_and_min,legend,value,index,valueTouseArray);
                    // creating dynamic colors for district
                    card.saveColorInlocalStorage(prepareId(card,value.id),appropiateColor.color);

                    // prepare objects of district for properties to display on tooltip
                    districtProperties[prepareId(card,value.id)] = {
                        district_id:prepareId(card,value.id),
                        year:card.thisyear,
                        name:value.properties.name,
                        "color":appropiateColor.color,
                        "facility":Math.floor(Math.random() * 256),
                        "anc_12":0,
                        "anc_fisrt":0,
                        "inst":0,
                        "post":0,
                        "measle":0,
                        "penta3":0,
                        "vitaminA":0,
                        "child":0,
                        "cervical":0,
                        "doctor":0,
                        "nurse":0,
                        "complete":0

                    };

                    card.DistrictFreeObject.push(districtProperties[prepareId(card,value.id)]);
                    card.districts[prepareId(card,value.id)]= districtProperties;

                    // creating geojson object
                    var Object = {
                        "type":"Feature",
                        "id":prepareId(card,value.id),
                        "properties":{
                            "name":value.properties
                        },
                        "geometry":{
                            "type":value.geometry.type,
                            "coordinates":value.geometry.coordinates
                        },
                        "style":{
                            fill:{
                                color:card.getColorFromLocalStorage(prepareId(card,value.id)),
                                opacity:5
                            },
                            stroke:{
                                color:'white',
                                width:2
                            }
                        }
                    };
                    TotalGeo.features.push(Object);

                });

                // function getter for district object
                var getColor = function(district){
                    if(!district || !district['district_id']){
                        return "#FFF";
                    }
                    var color = districtProperties[district['district_id']].color;
                    return color;
                }
                var getStyle = function(feature){
                    var style = olHelpers.createStyle({
                        fill:{
                            color:getColor(card.districts[feature.getId()]),
                            opacity:0.4
                        },
                        stroke:{
                            color:'#000000',
                            width:1
                        }
                    });
                    return [ style ];
                }

                angular.extend(card, {
                    Africa: {
                        zoom: 5.6,
                        lat: -6.45,
                        lon: 35
                    },
                    layers:[
                        {
                            name:'mapbox',
                            source: {
                                type: 'TileJSON',
                                url:'http://api.tiles.mapbox.com/v3/mapbox.geography-class.jsonp'
                            }
                        } ,
                        {
                            name:'geojson',
                            source: {
                                type: 'GeoJSON',
                                geojson: {
                                    object: TotalGeo
                                }
                            },
                            style: getStyle
                        }
                    ],
                    defaults: {
                        events: {
                            layers: [ 'mousemove', 'click']
                        }
                    }
                });

                card.districts = {};
                angular.forEach(card.DistrictFreeObject,function(data,index){
                    var district = data;
                    card.districts[district['district_id']] = district;
                });


                olData.getMap().then(function(scope) {
                    var previousFeature;
                    var overlay = new ol.Overlay({
                        element: document.getElementById('districtbox'),
                        positioning: 'top-right',
                        offset: [100, -100],
                        position: [100, -100]
                    });
                    var overlayHidden = true;
                });

                card.closeTootip = function(){
                    card.selectedDistrict = null;

                }
                card.closeTootipHover = function(){
                    card.selectedDistrictHover = null;

                }


            });
        card.saveColorInlocalStorage  = function(id,value){

            if(!card.getColorFromLocalStorage(id)){
                localStorage.setItem(id , value);
            }
        }

        card.getColorFromLocalStorage = function(id){
            var Item = localStorage.getItem( id );
            if(!Item){
                return false;
            }else{
                return Item;
            }

        }


    }
    function getMaxAndMin(card){

        var count = card.length;
        var individuals = [];
        if(count==27){
            console.log(" In Legend Here comes the pressure:"+count);
            var array_of_data = "";
            angular.forEach(card[0].data,function(value,index){

                if(index==card[0].data.length-1){
                    array_of_data = array_of_data+value;
                }else{
                    array_of_data=array_of_data+value+",";
                }

            });

            angular.forEach(card,function(value,index){

                if(value.name.split(" ").indexOf("Region")>=0){
//                        if(index>1){
                    individuals.push(value);
//                        }
                }


            });

            var max = Math.max.apply(Math, array_of_data.split(","));
            var min = Math.min.apply(Math, array_of_data.split(","));
            return [max,min,individuals];
        }else if(count==26){
            console.log(" In Legend Here comes the pressure:"+count);
            var array_of_data = "";
            angular.forEach(card[0].data,function(value,index){
                if(index==card[0].data.length-1){
                    array_of_data = array_of_data+value;
                }else{
                    array_of_data=array_of_data+value+",";
                }

            });


            angular.forEach(card,function(value,index){
                if(value.name.split(" ").indexOf("Region")>=0){
//                        if(index>1){
                    individuals.push(value);
//                        }
                }


            });

            var max = Math.max.apply(Math, array_of_data.split(","));
            var min = Math.min.apply(Math, array_of_data.split(","));
            return [max,min,individuals];

        }else{
            console.log(" In Legend Here comes the pressure:"+count);
            var array_of_data = "";
            var individuals = [];
            angular.forEach(card[0].data,function(value,index){

                if(index==card[0].data.length-1){
                    array_of_data = array_of_data+value;
                }else{
                    array_of_data=array_of_data+value+",";
                }

            });

            angular.forEach(card,function(value,index){

                if(value.name.split(" ").indexOf("Council")>=0){
                    if(index>1){
                        individuals.push(value);
                    }
                }

            });

            var max = Math.max.apply(Math, array_of_data.split(","));
            var min = Math.min.apply(Math, array_of_data.split(","));
            return [max,min,individuals];
        }
    }
    function getLegend(input){
        if(input){
            var legends = "";
            var max = parseInt(input[0]);
            var min = parseInt(input[1]);
            var data = input[2];
            var count = data.length;
            if(max==0){
                max=1;
            }
            var mins='';
            if(min==0){
                mins=0;
            }else{
                mins="0-"+min
            }

            if(((max-min)/count)<1){
                legends = [{set:mins+"",color:"#FF0000",classfy:"min",members:0},{set:min+" - "+((max+min)/2).toFixed(0),color:"#DEBE0C",classfy:"medium",members:0},{set:((max+min)/2).toFixed(0)+" - "+(max),color:"#25E90F",classfy:"inter",members:0},{set:(max)+"+",color:"#2F8533",classfy:"max",members:0}];
            }else{
                var intervals = ((max-min)/count).toFixed(0);
                legends = [{set:mins+"",color:"#FF0000",classfy:"min",members:0},{set:min+" - "+((max+min)/2).toFixed(0),color:"#DEBE0C",classfy:"medium",members:0},{set:((max+min)/2).toFixed(0)+" - "+(max),color:"#25E90F",classfy:"inter",members:0},{set:(max)+"+",color:"#2F8533",classfy:"max",members:0}];

            }
            return legends;
        }else{
            return false;
        }
    }
    function decideOnColor(max_and_min,legend,value,valueIndex,valueTouseArray){

        if(max_and_min[2].length==0){
            max_and_min[2]= valueTouseArray;
        }
        var classfy = "";
        var i = 0;
        angular.forEach(max_and_min[2],function(valueL,indexL){
            if(valueTouseArray[valueIndex].id==valueL.id){
                i++;
                if(valueL.value!=0&&valueL.value>=max_and_min[0]){

                    legend[3].members=legend[3].members+1;
                    classfy = legend[3];
                    return false;
                }

                if(valueL.value!=0&&valueL.value>((max_and_min[1]+max_and_min[0])/2)&&valueL.value<max_and_min[0]){

                    legend[2].members=legend[2].members+1;
                    classfy = legend[2];
                    return false;
                }

                if(valueL.value!=0&&valueL.value<=((max_and_min[1]+max_and_min[0])/2)&&valueL.value>max_and_min[1]){

                    legend[1].members=legend[1].members+1;
                    classfy = legend[1];
                    return false;
                }

                if(valueL.value==0||valueL.value<=max_and_min[1]){
                    legend[0].members=legend[0].members+1;
                    classfy = legend[0];
                    return false;
                }


//
//                if(valueL.value!=0&&valueL.value>=max_and_min[0]){
//
//                    legend[2].members=legend[2].members+1;
//                    classfy = legend[2];
//                    return false;
//                }else
//                if(valueL.value!=0&&valueL.value<=((max_and_min[1]+max_and_min[0])/2)&&valueL.value>max_and_min[1]){
//
//                    legend[1].members=legend[1].members+1;
//                    classfy = legend[1];
//                    return false;
//                }else
//                if(valueL.value==0||valueL.value<=max_and_min[1]){
//                    legend[0].members=legend[0].members+1;
//                    classfy = legend[0];
//                    return false;
//                }

//                legend[0].members= i;
//                classfy = legend[0];
            }else{

                return false;
            }
        });
        return classfy;
    }
    function prepareId(card,value){
        return card.data+"_"+value+"_"+$scope.selectedPeriod+"_"+$scope.selectedOrgUnit;
    }

    function removeDuplicatesInSeries(series){
//
//        var size = series.length;
//        var i, n,p;
//        var result = [];
//
//        if(size==26){
//            p=0
//        }else  if(size>26&&series[0].id.indexOf('series')>=0){
//            p=0;
//        }
//        for (i = p, n = series.length; i < n; i++) {
//            var item = series[i];
//            result[ item.id ] = item;
//        }
//
//        var i = 0;
//        var nonDuplicatedArray = [];
//        for(var item in result) {
//            nonDuplicatedArray[i++] = result[item];
//        }
//
//        return nonDuplicatedArray;
        return series;
    }
    return map;
}])
.factory('shared', function() {
        var shared = {
            "facility":0
        };
        return shared;
    });
    
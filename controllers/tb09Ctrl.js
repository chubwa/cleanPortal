/**
 * Created by mahane on 12/17/15.
 */
angular.module("hmisPortal")

    .config(function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.headers.post["Content-Type"] = "application/json";
    })
    .controller("tb09Ctrl",function ($rootScope,$scope,$http,$location,$timeout,olData,olHelpers,shared) {
        $scope.lastCard = function () {
            $scope.loadingImage=true;
            var base = "https://hmisportal.moh.go.tz/dhis/";
            $.post(base + "dhis-web-commons-security/login.action?authOnly=true", {
                j_username: "portal", j_password: "Portal123"
            }, function () {
                if ($scope.selectedOrgUnit == "m0frOspS7JY") {
                    $scope.url="https://hmisportal.moh.go.tz/dhis/api/analytics.json?dimension=dx:D00z9g5q7fl;rnoWh58LL7V;z69RgoUhdDB;zqDXIiyiAGP;lOZnSwvbMOg;IFMimUG3uMc;sNeIuKQ2rff;evTWT8OdWGZ;G8mHZnfz0UF;EYtPjPFxZuK;fQBj2xFyuEm;GEV7SssRNQ1;VIooF1o0Hjr;rd0uwhhXe5I;e8eRqTmkwSq;bpTFTWqp2KL;K7NVqASvtg8;kQbtZLMSVaO;eT6necvErEH;AJsberpD2R2;FvoZA7Nl7f6;KxVkmaVJ6sT;TQ2c1aCh5Nc;ppVUbX29DFR;oGSIVUqH7ri;DE755OOgvTo;zh6BhKV8DpK;vaMieEX1neR;GHt2uEuLUku;hAMeLqaWBkM;BT0ppwp8J2f;bGvu2rGcSSR;z7MiKwx7Jav;mOpuHVksNN4&dimension=ou:LEVEL-2;"+ $scope.selectedOrgUnit +"&filter=pe:" + $scope.selectedPeriod + "&displayProperty=NAME";
                } else {
                    $scope.url="https://hmisportal.moh.go.tz/dhis/api/analytics.json?dimension=dx:D00z9g5q7fl;rnoWh58LL7V;z69RgoUhdDB;zqDXIiyiAGP;lOZnSwvbMOg;IFMimUG3uMc;sNeIuKQ2rff;evTWT8OdWGZ;G8mHZnfz0UF;EYtPjPFxZuK;fQBj2xFyuEm;GEV7SssRNQ1;VIooF1o0Hjr;rd0uwhhXe5I;e8eRqTmkwSq;bpTFTWqp2KL;K7NVqASvtg8;kQbtZLMSVaO;eT6necvErEH;AJsberpD2R2;FvoZA7Nl7f6;KxVkmaVJ6sT;TQ2c1aCh5Nc;ppVUbX29DFR;oGSIVUqH7ri;DE755OOgvTo;zh6BhKV8DpK;vaMieEX1neR;GHt2uEuLUku;hAMeLqaWBkM;BT0ppwp8J2f;bGvu2rGcSSR;z7MiKwx7Jav;mOpuHVksNN4&dimension=ou:LEVEL-3;"+ $scope.selectedOrgUnit +"&filter=pe:" + $scope.selectedPeriod + "&displayProperty=NAME";
                }

                $http.get($scope.url).success(function (metaData) {
                    var dataElementArray = metaData.metaData.dx;
                    var orgUnitArray = [];
                    var prepareTableHeaders = [];
                    var allData = [];
                    for (var i = 0; i < dataElementArray.length; i++) {
                        prepareTableHeaders.push({
                            "uid": dataElementArray[i],
                            "name": metaData.metaData.names[dataElementArray[i]]
                        })
                    }
                    angular.forEach(metaData.metaData.ou, function (values) {
                        allData.push({"orGunit": metaData.metaData.names[values], "orgUnitId": values});
                    });
                    angular.forEach(allData, function (value) {
                        var dataElement = [];
                        angular.forEach(prepareTableHeaders, function (headers) {
                            var values = '';
                            angular.forEach(metaData.rows, function (val) {
                                if (value.orgUnitId == val[1] && val[0] == headers.uid) {
                                    values = val[2];
                                }

                            });
                            dataElement.push({"name": headers.name, "uid": headers.uid, "value": values})
                        });
                        orgUnitArray.push({"name": value.orGunit, 'uid': value.orgUnitId, 'dataElement': dataElement});
                    });
                    $scope.loadingImage=false;
                    $scope.headers = prepareTableHeaders;
                    $scope.rows = orgUnitArray;
                    console.log(orgUnitArray);
                });
            })
        }
        $scope.downloadExcelTotal = function(){
            var base = "https://hmisportal.moh.go.tz/dhis/";
            $.post( base + "dhis-web-commons-security/login.action?authOnly=true", {
                j_username: "portal", j_password: "Portal123"
            },function(){
                if($scope.selectedOrgUnit == "m0frOspS7JY"){
                    var lastUrl="https://hmisportal.moh.go.tz/dhis/api/analytics.json?dimension=dx:D00z9g5q7fl;rnoWh58LL7V;z69RgoUhdDB;zqDXIiyiAGP;lOZnSwvbMOg;IFMimUG3uMc;sNeIuKQ2rff;evTWT8OdWGZ;G8mHZnfz0UF;EYtPjPFxZuK;fQBj2xFyuEm;GEV7SssRNQ1;VIooF1o0Hjr;rd0uwhhXe5I;e8eRqTmkwSq;bpTFTWqp2KL;K7NVqASvtg8;kQbtZLMSVaO;eT6necvErEH;AJsberpD2R2;FvoZA7Nl7f6;KxVkmaVJ6sT;TQ2c1aCh5Nc;ppVUbX29DFR;oGSIVUqH7ri;DE755OOgvTo;zh6BhKV8DpK;vaMieEX1neR;GHt2uEuLUku;hAMeLqaWBkM;BT0ppwp8J2f;bGvu2rGcSSR;z7MiKwx7Jav;mOpuHVksNN4&dimension=ou:LEVEL-2;m0frOspS7JY&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME&tableLayout=true&columns=dx&rows=ou";
                    //var lastUrl="https://hmisportal.moh.go.tz/dhis/api/analytics.csv?dimension=dx:i47jm4Pkkq6;vfaY7k6TINl;tit1C1VPIV7;aw1jQ1tJTmE&dimension=ou:LEVEL-2;m0frOspS7JY&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME";
                }else{
                    var lastUrl="https://hmisportal.moh.go.tz/dhis/api/analytics.json?dimension=dx:D00z9g5q7fl;rnoWh58LL7V;z69RgoUhdDB;zqDXIiyiAGP;lOZnSwvbMOg;IFMimUG3uMc;sNeIuKQ2rff;evTWT8OdWGZ;G8mHZnfz0UF;EYtPjPFxZuK;fQBj2xFyuEm;GEV7SssRNQ1;VIooF1o0Hjr;rd0uwhhXe5I;e8eRqTmkwSq;bpTFTWqp2KL;K7NVqASvtg8;kQbtZLMSVaO;eT6necvErEH;AJsberpD2R2;FvoZA7Nl7f6;KxVkmaVJ6sT;TQ2c1aCh5Nc;ppVUbX29DFR;oGSIVUqH7ri;DE755OOgvTo;zh6BhKV8DpK;vaMieEX1neR;GHt2uEuLUku;hAMeLqaWBkM;BT0ppwp8J2f;bGvu2rGcSSR;z7MiKwx7Jav;mOpuHVksNN4&dimension=ou:LEVEL-3;"+$scope.selectedOrgUnit+"&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME&tableLayout=true&columns=dx&rows=ou"
                    //var lastUrl="https://hmisportal.moh.go.tz/dhis/api/analytics.csv?dimension=dx:i47jm4Pkkq6;vfaY7k6TINl;tit1C1VPIV7;aw1jQ1tJTmE&dimension=ou:LEVEL-3;"+$scope.selectedOrgUnit+"&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME";
                }
                $http.get(lastUrl,{'Content-Type': 'application/octet-stream'}).success(function(data){
                    var a = document.createElement('a');
                    var blob = new Blob([data]);
                    a.href = window.URL.createObjectURL(blob);
                    a.download = "data.xls";
                    a.click();
                }).error(function(error){
                    alert("Aunthentification Failed " +error);
                });
            });
        }
        $rootScope.firstClick = function(){
            $scope.lastCard();
        }
        $scope.firstClick();
    });
/**
 * Created by mahane on 12/17/15.
 */
angular.module("hmisPortal")

    .config(function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.headers.post["Content-Type"] = "application/json";
    })
    .controller("childCtrl",function ($rootScope,$scope,$http,$location,$timeout,olData,olHelpers,shared) {
        $scope.lastCard = function () {
            $scope.loadingImage=true;
            var base = "https://hmisportal.moh.go.tz/dhis/";
            $.post(base + "dhis-web-commons-security/login.action?authOnly=true", {
                j_username: "portal", j_password: "Portal123"
            }, function () {
                if ($scope.selectedOrgUnit == "m0frOspS7JY") {
                    $scope.url="https://hmisportal.moh.go.tz/dhis/api/analytics.json?dimension=dx:C3JNuqqF5V8;CElkQdfvpNG;CVfJAXXTimc;D0xj0l6t8iN;EuOs3qynm8G;Hy73Ne2gmyY;IpXXw5uQuQ7;JXJ6K85BwHb;Ju7deqFs5Mx;Jv9w2Ia2ppM;KRcY8bdT4Mk;KTXcMFWnbrP;KYydraby8cN;LRpGuzpIpij;Lm7jBB0h77z;NbZwFTlvLE8;Q2fFmlGkxRN;RaSPLufKgM3;V2ZzQl7dgVF;VPH0M4oc6bs;WhRlrHeEh1g;ZTBuSFKWqde;eJIa71oGfmV;gDDMTBTSqyL;hnnweYHae32;jPsDKyPmbME;kgcVmh9bEZN;lDLstVpbacl;lT9dQN7LUXX;lgQ3s5fypvb;olPf1AU1Hm3;raInQyFRFJF;sHLX6OnotOU;veI4OTWHLlE;xodHxfAwN5d;yKypqIROIO9;zurze8Yl6TW&dimension=ou:LEVEL-2;"+ $scope.selectedOrgUnit +"&filter=pe:" + $scope.selectedPeriod + "&displayProperty=NAME";
                } else {
                    $scope.url="https://hmisportal.moh.go.tz/dhis/api/analytics.json?dimension=dx:C3JNuqqF5V8;CElkQdfvpNG;CVfJAXXTimc;D0xj0l6t8iN;EuOs3qynm8G;Hy73Ne2gmyY;IpXXw5uQuQ7;JXJ6K85BwHb;Ju7deqFs5Mx;Jv9w2Ia2ppM;KRcY8bdT4Mk;KTXcMFWnbrP;KYydraby8cN;LRpGuzpIpij;Lm7jBB0h77z;NbZwFTlvLE8;Q2fFmlGkxRN;RaSPLufKgM3;V2ZzQl7dgVF;VPH0M4oc6bs;WhRlrHeEh1g;ZTBuSFKWqde;eJIa71oGfmV;gDDMTBTSqyL;hnnweYHae32;jPsDKyPmbME;kgcVmh9bEZN;lDLstVpbacl;lT9dQN7LUXX;lgQ3s5fypvb;olPf1AU1Hm3;raInQyFRFJF;sHLX6OnotOU;veI4OTWHLlE;xodHxfAwN5d;yKypqIROIO9;zurze8Yl6TW&dimension=ou:LEVEL-3;"+ $scope.selectedOrgUnit +"&filter=pe:" + $scope.selectedPeriod + "&displayProperty=NAME";
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
                    var lastUrl="https://hmisportal.moh.go.tz/dhis/api/analytics.json?dimension=dx:C3JNuqqF5V8;CElkQdfvpNG;CVfJAXXTimc;D0xj0l6t8iN;EuOs3qynm8G;Hy73Ne2gmyY;IpXXw5uQuQ7;JXJ6K85BwHb;Ju7deqFs5Mx;Jv9w2Ia2ppM;KRcY8bdT4Mk;KTXcMFWnbrP;KYydraby8cN;LRpGuzpIpij;Lm7jBB0h77z;NbZwFTlvLE8;Q2fFmlGkxRN;RaSPLufKgM3;V2ZzQl7dgVF;VPH0M4oc6bs;WhRlrHeEh1g;ZTBuSFKWqde;eJIa71oGfmV;gDDMTBTSqyL;hnnweYHae32;jPsDKyPmbME;kgcVmh9bEZN;lDLstVpbacl;lT9dQN7LUXX;lgQ3s5fypvb;olPf1AU1Hm3;raInQyFRFJF;sHLX6OnotOU;veI4OTWHLlE;xodHxfAwN5d;yKypqIROIO9;zurze8Yl6TW&dimension=ou:LEVEL-2;m0frOspS7JY&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME&tableLayout=true&columns=dx&rows=ou";
                    //var lastUrl="http://139.162.204.124/dhis/api/analytics.csv?dimension=dx:i47jm4Pkkq6;vfaY7k6TINl;tit1C1VPIV7;aw1jQ1tJTmE&dimension=ou:LEVEL-2;m0frOspS7JY&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME";
                }else{
                    var lastUrl="https://hmisportal.moh.go.tz/dhis/api/analytics.json?dimension=dx:C3JNuqqF5V8;CElkQdfvpNG;CVfJAXXTimc;D0xj0l6t8iN;EuOs3qynm8G;Hy73Ne2gmyY;IpXXw5uQuQ7;JXJ6K85BwHb;Ju7deqFs5Mx;Jv9w2Ia2ppM;KRcY8bdT4Mk;KTXcMFWnbrP;KYydraby8cN;LRpGuzpIpij;Lm7jBB0h77z;NbZwFTlvLE8;Q2fFmlGkxRN;RaSPLufKgM3;V2ZzQl7dgVF;VPH0M4oc6bs;WhRlrHeEh1g;ZTBuSFKWqde;eJIa71oGfmV;gDDMTBTSqyL;hnnweYHae32;jPsDKyPmbME;kgcVmh9bEZN;lDLstVpbacl;lT9dQN7LUXX;lgQ3s5fypvb;olPf1AU1Hm3;raInQyFRFJF;sHLX6OnotOU;veI4OTWHLlE;xodHxfAwN5d;yKypqIROIO9;zurze8Yl6TW&dimension=ou:LEVEL-3;"+$scope.selectedOrgUnit+"&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME&tableLayout=true&columns=dx&rows=ou"
                    //var lastUrl="http://139.162.204.124/dhis/api/analytics.csv?dimension=dx:i47jm4Pkkq6;vfaY7k6TINl;tit1C1VPIV7;aw1jQ1tJTmE&dimension=ou:LEVEL-3;"+$scope.selectedOrgUnit+"&filter=pe:"+$scope.selectedPeriod+"&displayProperty=NAME";
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
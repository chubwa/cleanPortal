/**
 * Created by mahane on 12/17/15.
 */
angular.module("hmisPortal")

    .config(function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.headers.post["Content-Type"] = "application/json";
    })
    .controller("postnatalCtrl",function ($rootScope,$scope,$http,$location,$timeout,olData,olHelpers,shared) {
        $scope.lastCard = function () {
            $scope.loadingImage=true;
            var base = "http://139.162.204.124/dhis/";
            $.post(base + "dhis-web-commons-security/login.action?authOnly=true", {
                j_username: "portal", j_password: "Portal123"
            }, function () {
                if ($scope.selectedOrgUnit == "m0frOspS7JY") {
                    $scope.url="http://139.162.204.124/dhis/api/analytics.json?dimension=dx:jmiebz1jQDn;ENPBKqXUs0e;vwlq4UUuM3L;IEMyGwhBTXd;tiqnsoZrT6O;XmlrCz7rtai;BmKchKT33Ma;t68N1TMssP9;uo0vR5ijRAY;u1Ug6tqLXYV;ed3cOOqsNe6;v4fqACPcQGv;P8oJozgshHT;xIE7RYdEiXY;KCglHLBNByp;wNYeVWYR054;WnqLevD8Jv2;vJR9ESX6u0F;HxF7UynSReV;bYbpbaandWc;CoF4u7RIOHp;frIrwyff1Go;wludU7DjWXI;ZGS3F6Sj69V;juaTrr3MFPl;KsjpX2i1kOJ;Hn4HdgfPPss;tXfA3h3bZym;WPRpYRKtyUu;dhZIhHwaWUX;bXhMCyRvSPt;hpP56Mn8Jci;C0rY5CYwGfo;uHJHpFi9snK;xwEgTRubPXr;XTfPefMPVds;IMFnOuCeMHi;TKzkLlSn677&dimension=ou:LEVEL-2;"+ $scope.selectedOrgUnit +"&filter=pe:" + $scope.selectedPeriod + "&displayProperty=NAME";
                } else {
                    $scope.url="http://139.162.204.124/dhis/api/analytics.json?dimension=dx:jmiebz1jQDn;ENPBKqXUs0e;vwlq4UUuM3L;IEMyGwhBTXd;tiqnsoZrT6O;XmlrCz7rtai;BmKchKT33Ma;t68N1TMssP9;uo0vR5ijRAY;u1Ug6tqLXYV;ed3cOOqsNe6;v4fqACPcQGv;P8oJozgshHT;xIE7RYdEiXY;KCglHLBNByp;wNYeVWYR054;WnqLevD8Jv2;vJR9ESX6u0F;HxF7UynSReV;bYbpbaandWc;CoF4u7RIOHp;frIrwyff1Go;wludU7DjWXI;ZGS3F6Sj69V;juaTrr3MFPl;KsjpX2i1kOJ;Hn4HdgfPPss;tXfA3h3bZym;WPRpYRKtyUu;dhZIhHwaWUX;bXhMCyRvSPt;hpP56Mn8Jci;C0rY5CYwGfo;uHJHpFi9snK;xwEgTRubPXr;XTfPefMPVds;IMFnOuCeMHi;TKzkLlSn677&dimension=ou:LEVEL-3;"+ $scope.selectedOrgUnit +"&filter=pe:" + $scope.selectedPeriod + "&displayProperty=NAME";
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
        $rootScope.firstClick = function(){
            $scope.lastCard();
        }
        $scope.firstClick();
    });
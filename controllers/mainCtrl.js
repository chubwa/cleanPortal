/**
 * Created by kelvin on 10/20/15.
 */

angular.module("hmisPortal")
    .run(function() {

    })
    .controller("mainCtrl",function ($rootScope,$scope,$q) {

        $rootScope.showLoader = false;
        $rootScope.$on("$routeChangeStart",
            function (event, current, previous, rejection) {
                $rootScope.showLoader = true;
            });
        $rootScope.$on("$routeChangeSuccess",
            function (event, current, previous, rejection) {
                $rootScope.showLoader = false;

            });

        $rootScope.changePeriodType = function(){

        };

        $scope.userGroupID='tthud5BXCSD';
        $rootScope.periodType = 'years';
        var userGroups =[];
        var dataTextToSend={};

        var messageUrl='http://139.162.204.124/dhis/api/messageConversations';
        $scope.sendMessage=function(subject,text){
            userGroups.length=0;
            userGroups.push({'id':$scope.userGroupID});
            dataTextToSend['subject']=subject;
            dataTextToSend['text']=text;
            dataTextToSend['userGroups']=userGroups;
            console.log(dataTextToSend);
            $http({
                method: 'POST',
                url: messageUrl,
                data: dataTextToSend
            }).then(function(response) {
                    console.log(dataTextToSend);
                    // success
                },
                function(response) { // optional
                    // failed
                });

        }
        $scope.cards = {};
        $scope.data = {};
        $rootScope.periodType = 'years';
        $rootScope.selectedOrgUnit = "m0frOspS7JY";
        $rootScope.selectedPeriod = "2014";
        $scope.selectedOrgUnitLevel = "2";
        $scope.chartConfig = {
            title: {
                text: 'Combination chart'
            },
            xAxis: {
                categories: [],
                labels:{
                    rotation: -70,
                    style:{ "color": "#000000", "fontWeight": "normal" }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                },labels:{
                    style:{ "color": "#000000", "fontWeight": "bold" }
                }
            },
            labels: {
                items: [{
                    html: 'doses',
                    style: {
                        left: '50px',
                        top: '18px',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                    }
                }]
            },
            series: []
        };

        $scope.leftclass = 'col s2';
        $scope.rightclass = 'col s10';
        $scope.showFilter = true;
        $scope.hideFilter = function(){
            $scope.rightclass = 'col s12';
            $scope.showFilter = false;
        };
        $scope.displayFilter = function(){
            $scope.leftclass = 'col s2';
            $scope.rightclass = 'col s10';
            $scope.showFilter = true;
        };

        $scope.linkValue = 'statistcs';

        $scope.activateLink = function(linkValue){
            $scope.linkValue = linkValue;
            alert(linkValue);
        }
     });
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
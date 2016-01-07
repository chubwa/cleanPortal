/**
 * Created by mahane on 1/6/16.
 */

angular.module("hmisPortal")
    .config(function($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    })
    .controller("newbornCareCtrl",function ($rootScope,$scope,$http,$location,$timeout,olData,olHelpers,shared,portalService) {
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
                title:'Waliozaliwa Hai Uzito <2.5Kg',
                description:'Maelezo ya Waliozaliwa Hai Uzito <2.5Kg',
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col s12 m6",
                data:'fC9eHFeDvRG',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'Waliozaliwa Hai Uzito >=2.5Kg',
                description:'Maelezo ya Waliozaliwa Hai Uzito >=2.5Kg',
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                cardSize:"medium",
                data:'OYZqyYdha5W',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'line',
                chartObject:angular.copy(portalService.chartObject)

            },
            {
                title:'Watoto Waliozaliwa Hai',
                description:'Maelezo ya Watoto Waliozaliwa Hai',
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m12 s12",
                data:'tvscIxUNNpl',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'combined',
                chartObject:angular.copy(portalService.chartObject)

            },
            {
                title:'Watoto Walionyonyeshwa Saa Moja Baada Ya Kuzaliwa',
                description:'Watoto Walionyonyeshwa Saa Moja Baada Ya Kuzaliwa',
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'Kvt72ZQhs7Y',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)

            },
            {
                title:'Watoto Waliosaidiwa Kupumua - Bag And Mask',
                description:'Watoto Waliosaidiwa Kupumua - Bag And Mask',
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'pVTitSjQ3oL',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'Watoto Waliosaidiwa Kupumua - Simulation',
                description:'Watoto Waliosaidiwa Kupumua - Simulation',
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'H8pprB9HXYF',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'Watoto Waliosaidiwa Kupumua - Suction',
                description:'Watoto Waliosaidiwa Kupumua - Suction',
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'KAiGnZ0qtWd',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'Watoto Waliozaliwa Nyumbani na Kuanzishiwa KMC',
                description:'Watoto Waliozaliwa Nyumbani na Kuanzishiwa KMC',
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'bXhMCyRvSPt',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'Watoto Waliozaliwa Nyumbani na Uzito <2.5Kg',
                description:'Watoto Waliozaliwa Nyumbani na Uzito <2.5Kg',
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'hpP56Mn8Jci',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'Watoto Waliozaliwa na Uzito <2.5Kg Wakapatiwa KMC',
                description:'Watoto Waliozaliwa na Uzito <2.5Kg Wakapatiwa KMC',
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'C0rY5CYwGfo',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'Watoto Wenye Upungufu wa Damu (Hb < 10 g/dl au Viganja Vyeupe Sana',
                description:'Watoto Wenye Upungufu wa Damu (Hb < 10 g/dl au Viganja Vyeupe Sana',
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'TKzkLlSn677',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'PNC watoto wenye jaundice',
                description:'PNC watoto wenye jaundice',
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'rlH65dJ48zb',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'Vifo vya Watoto Wachanga Waliozaliwa Nyumbani (Perinatal)  Neonatal',
                description:'Vifo vya Watoto Wachanga Waliozaliwa Nyumbani (Perinatal)  Neonatal',
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'KCglHLBNByp',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'Watoto Waliopewa ARV Katika PNC',
                description:'Watoto Waliopewa ARV Katika PNC',
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'tXfA3h3bZym',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'Watoto Wenye Uambukizo Kwenye  Ngozi',
                description:'Watoto Wenye Uambukizo Kwenye  Ngozi',
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'xwEgTRubPXr',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'Watoto Wenye Uambukizo Kwenye Kitovu',
                description:'Watoto Wenye Uambukizo Kwenye Kitovu',
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'XTfPefMPVds',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'Watoto Wenye Uambukizo Mkali (Septicaemia)',
                description:'Watoto Wenye Uambukizo Mkali (Septicaemia)',
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'IMFnOuCeMHi',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'Watoto Waliohudhuria Mahudhurio Yote Postnatal',
                description:'Watoto Waliohudhuria Mahudhurio Yote Postnatal',
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'juaTrr3MFPl',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'Waliopata rufaa kwenda CTC kutoka L&D',
                description:'Waliopata rufaa kwenda CTC kutoka L&D',
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'FLxWc7y0Q4I',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'Watoto Waliohudhuria PNC Kati ya Siku ya 2-7',
                description:'Watoto Waliohudhuria PNC Kati ya Siku ya 2-7',
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'KsjpX2i1kOJ',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'Mapacha Waliozaliwa Wakafa (FSB)',
                description:'Mapacha Waliozaliwa Wakafa (FSB)',
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'VmdKpg6sNUe',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'Waliozaliwa Wakafa (FSB)',
                description:'Waliozaliwa Wakafa (FSB)',
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'MmVGhPhIGwf',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'Waliozaliwa Wafu (Msb)',
                description:'Waliozaliwa Wafu (Msb)',
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'XJUBOFs2prE',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'Mapacha Waliozaliwa Wafu (MSB)',
                description:'Mapacha Waliozaliwa Wafu (MSB)',
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'noAFjjrlq0I',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'Watoto Waliohudhuria PNC Ndani ya Saa 24',
                description:'Watoto Waliohudhuria PNC Ndani ya Saa 24',
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'Hn4HdgfPPss',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'Mapacha Waliozaliwa Hai Uzito <2.5Kg',
                description:'Mapacha Waliozaliwa Hai Uzito <2.5Kg',
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'ce7ATPhE8Iv',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'Mapacha Waliozaliwa Hai Uzito >=2.5Kg',
                description:'Mapacha Waliozaliwa Hai Uzito >=2.5Kg',
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'BH38bhaFhLi',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'Mapacha Wenye APGAR Score Chini ya 7 Katika Dakika 5',
                description:'Mapacha Wenye APGAR Score Chini ya 7 Katika Dakika 5',
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'Kt3DuTIieoT',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'Mama na Mtoto Waliopewa Rufaa',
                description:'Mama na Mtoto Waliopewa Rufaa',
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'p6wxhLrgfYk',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'Watoto Waliosaidiwa Kupumua - Bag And Mask',
                description:'Watoto Waliosaidiwa Kupumua - Bag And Mask',
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'pVTitSjQ3oL',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'Watoto mapacha waliosaidiwa kupumua  - suction',
                description:'Watoto mapacha waliosaidiwa kupumua  - suction',
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'gFhqoNswp73',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'Watoto mapacha waliosaidiwa kupumua - simulation',
                description:'Watoto mapacha waliosaidiwa kupumua - simulation',
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'pa8UbdA2aHj',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'Birth Asphyxia',
                description:'Birth Asphyxia',
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'CWXG9lBSI7Y',
                icons:angular.copy(portalService.icons),
                displayTable:false,
                displayMap:false,
                chart:'bar',
                chartObject:angular.copy(portalService.chartObject)
            },
            {
                title:'Low Birth Weight And Prematurity Complication',
                description:'Low Birth Weight And Prematurity Complication',
                numerator:portalService.numerator,
                denominator:portalService.denominator,
                cardClass:"col m6 s12",
                data:'Y7upeLGM36C',
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


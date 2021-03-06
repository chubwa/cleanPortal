/**
 * Created by kelvin on 1/9/15.
 */
angular.module("hmisPortal")
    .run( function($rootScope, $location) {
          // register listener to watch route changes
        $rootScope.$on( "$routeChangeStart", function(event, next, current) {
            Pace.restart()
        });
    })
    .config( function($routeProvider){
        $routeProvider.when("/home",{
            templateUrl: 'views/dashboard.html',
            controller: 'dashboardCtrl'
        });

        $routeProvider.when("/downloads",{
            templateUrl: 'views/downloads.html',
            controller: 'dashboardCtrl'
        });

        $routeProvider.when("/district_profiles",{
            templateUrl: 'views/district_profiles.html',
            controller: 'mainCtrl'
        });

        $routeProvider.when("/malaria",{
            templateUrl: 'views/malaria.html',
            controller: 'malariaCtrl'
        });

        $routeProvider.when("/maternal",{
            templateUrl: 'views/maternal.html',
            controller: 'maternalCtrl'
        });
        $routeProvider.when("/hivads",{
            templateUrl: 'views/hivads.html',
            controller: 'hivadsCtrl'
        });

        $routeProvider.when("/ivd",{
            templateUrl: 'views/ivd.html',
            controller: 'ivdCtrl'
        });

        $routeProvider.when("/nutrition",{
            templateUrl: 'views/nutrition.html',
            controller: 'nutritionCtrl'
        });

        $routeProvider.when("/morbidity",{
            templateUrl: 'views/morbidity.html',
            controller: 'morbidityCtrl'
        });

        $routeProvider.when("/mortality",{
            templateUrl: 'views/mortality.html',
            controller: 'mortalityCtrl'
        });

        $routeProvider.when("/tracer_medicine",{
            templateUrl: 'views/tracer_medicine.html',
            controller: 'tracermedicineCtrl'
        });

        $routeProvider.when("/hiv",{
            templateUrl: 'views/hiv.html',
            controller: 'mainCtrl'
        });

        $routeProvider.when("/tb",{
            templateUrl: 'views/tb.html',
            controller: 'tbCtrl'
        });

        $routeProvider.when("/updates",{
            templateUrl: 'views/updates.html',
            controller: 'mainCtrl'
        });
        $routeProvider.when("/antenatal",{
            templateUrl: 'views/antenatal.html',
            controller: 'antenatalCtrl'
        });
        $routeProvider.when("/labour",{
            templateUrl: 'views/labour.html',
            controller: 'labourCtrl'
        });
        $routeProvider.when("/child",{
            templateUrl: 'views/child.html',
            controller: 'childCtrl'
        });
        $routeProvider.when("/ipd",{
            templateUrl: 'views/ipd.html',
            controller: 'ipdCtrl'
        });
        $routeProvider.when("/opd",{
            templateUrl: 'views/opd.html',
            controller: 'opdCtrl'
        });
        $routeProvider.when("/postnatal",{
            templateUrl: 'views/postnatal.html',
            controller: 'postnatalCtrl'
        });
        $routeProvider.when("/planning",{
            templateUrl: 'views/planning.html',
            controller: 'planningCtrl'
        });
        $routeProvider.when("/mortalities",{
            templateUrl: 'views/mortalities.html',
            controller: 'mortalitiesCtrl'
        });
        $routeProvider.when("/familyPlaning",{
            templateUrl: 'views/familyPlaning.html',
            controller: 'familyPlaningCtrl'
        });
        $routeProvider.when("/fpIntegration",{
            templateUrl: 'views/fpIntegration.html',
            controller: 'fpIntegrationCtrl'
        });
        $routeProvider.when("/antenatalCare",{
            templateUrl: 'views/antenatalCare.html',
            controller: 'antenatalCareCtrl'
        });
        $routeProvider.when("/ancIntegration",{
            templateUrl: 'views/ancIntegration.html',
            controller: 'ancIntegrationCtrl'
        });
        $routeProvider.when("/laborDelivery",{
            templateUrl: 'views/laborDelivery.html',
            controller: 'laborDeliveryCtrl'
        });
        $routeProvider.when("/ldIntegration",{
            templateUrl: 'views/ldIntegration.html',
            controller: 'ldIntegrationCtrl'
        });
        $routeProvider.when("/newbornCare",{
            templateUrl: 'views/newbornCare.html',
            controller: 'newbornCareCtrl'
        });
        $routeProvider.when("/postnal",{
            templateUrl: 'views/postnal.html',
            controller: 'postnalCtrl'
        });
        $routeProvider.when("/pncIntegration",{
            templateUrl: 'views/pncIntegration.html',
            controller: 'pncIntegrationCtrl'
        });
        $routeProvider.when("/gbvVac",{
            templateUrl: 'views/gbvVac.html',
            controller: 'gbvVacCtrl'
        });
        $routeProvider.when("/cervicalCancer",{
            templateUrl: 'views/cervicalCancer.html',
            controller: 'cervicalCancerCtrl'
        });
        $routeProvider.when("/book10",{
            templateUrl: 'views/book10.html',
            controller: 'book10Ctrl'
        });
        $routeProvider.when("/death",{
            templateUrl: 'views/death.html',
            controller: 'deathCtrl'
        });
        $routeProvider.when("/sti",{
            templateUrl: 'views/sti.html',
            controller: 'stiCtrl'
        });
        $routeProvider.when("/tracer",{
            templateUrl: 'views/tracer.html',
            controller: 'tracerCtrl'
        });
        $routeProvider.when("/dtc",{
            templateUrl: 'views/dtc.html',
            controller: 'dtcCtrl'
        });
        $routeProvider.when("/hbc",{
            templateUrl: 'views/hbc.html',
            controller: 'hbcCtrl'
        });
        $routeProvider.when("/eye",{
            templateUrl: 'views/eye.html',
            controller: 'eyeCtrl'
        });
        $routeProvider.when("/hct",{
            templateUrl: 'views/hct.html',
            controller: 'hctCtrl'
        });
        $routeProvider.when("/pmtct",{
            templateUrl: 'views/pmtct.html',
            controller: 'pmtctCtrl'
        });
        $routeProvider.when("/lep07",{
            templateUrl: 'views/lep07.html',
            controller: 'lep07Ctrl'
        });
        $routeProvider.when("/lep09",{
            templateUrl: 'views/lep09.html',
            controller: 'lep09Ctrl'
        });
        $routeProvider.when("/lep10",{
            templateUrl: 'views/lep10.html',
            controller: 'lep10Ctrl'
        });
        $routeProvider.when("/tbo7",{
            templateUrl: 'views/tbo7.html',
            controller: 'tbo7Ctrl'
        });
        $routeProvider.when("/tb09",{
            templateUrl: 'views/tb09.html',
            controller: 'tb09Ctrl'
        });
        $routeProvider.otherwise({
            redirectTo: '/home'
        });



});
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
            controller: 'mainCtrl'
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

        $routeProvider.otherwise({
            redirectTo: '/home'
        });



});
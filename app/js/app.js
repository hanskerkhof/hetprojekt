var hpApp = angular.module('hpApp', ['angularSoundManager'])

    .controller('MainCtrl', ['$scope', function ($scope) {
        $scope.songs = [
            {
                id: 'one',
                title: 'Depro',
                artist: 'Het Projekt',
                url: 'mp3/depro.mp3'
            },
            {
                id: 'two',
                title: 'Going strange',
                artist: 'Het Projekt',
                url: 'mp3/going_strange.mp3'
            },
            {
                id: 'three',
                title: 'Only buildings',
                artist: 'Het Projekt',
                url: 'mp3/only_buildings.mp3'
            },
            {
                id: 'four',
                title: 'Black boxes',
                artist: 'Het Projekt',
                url: 'mp3/black_boxes.mp3'
            },
            {
                id: 'five',
                title: 'Leave me alone',
                artist: 'Het Projekt',
                url: 'mp3/leave me alone.mp3'
            },
            {
                id: 'six',
                title: 'Clouds in my eye',
                artist: 'Het Projekt',
                url: 'mp3/clouds in my eyes.mp3'
            },
            {
                id: '7',
                title: 'Why',
                artist: 'Het Projekt',
                url: 'mp3/why.mp3'
            },
            {
                id: '8',
                title: 'Tapechant',
                artist: 'Het Projekt',
                url: 'mp3/tapechant.mp3'
            },
            {
                id: '9',
                title: 'Back to the base',
                artist: 'Het Projekt',
                url: 'mp3/back to the base.mp3'
            },
            {
                id: '10',
                title: 'The light',
                artist: 'Het Projekt',
                url: 'mp3/the_light.mp3'
            },
            {
                id: '11',
                title: 'Orgasm',
                artist: 'Het Projekt',
                url: 'mp3/orgasm_nr1.mp3'
            },
            {
                id: '12',
                title: 'Airport',
                artist: 'Het Projekt',
                url: 'mp3/airport.mp3'
            },
            {
                id: '13',
                title: 'Bad day',
                artist: 'Het Projekt',
                url: 'mp3/bad_day.mp3'
            },
            {
                id: '14',
                title: 'Orgasm nr 2',
                artist: 'Het Projekt',
                url: 'mp3/orgasm nr2.mp3'
            },
            {
                id: '15',
                title: 'Jezus love you',
                artist: 'Het Projekt',
                url: 'mp3/jesus_loves_you.mp3'
            },
            {
                id: '16',
                title: 'Only buildings soft version',
                artist: 'Het Projekt',
                url: 'mp3/only buildings nr2.mp3'
            },
            {
                id: '17',
                title: 'The white man\'s bitches son',
                artist: 'Het Projekt',
                url: 'mp3/white_man_son.mp3'
            },
            {
                id: '18',
                title: 'Children of Laos',
                artist: 'Het Projekt',
                url: 'mp3/children_of_Laos.mp3'
            },
            {
                id: '19',
                title: 'Ik rook niet meer',
                artist: 'Het Projekt',
                url: 'mp3/rook niet meer.mp3'
            },
            {
                id: '20',
                title: 'Count yourself lucky',
                artist: 'Het Projekt',
                url: 'mp3/count_yourself.mp3'
            },
            {
                id: '21',
                title: 'This is for you',
                artist: 'Het Projekt',
                url: 'mp3/this is for u.mp3'
            },
            {
                id: '22',
                title: 'Nokken',
                artist: 'Het Projekt',
                url: 'mp3/nokken.mp3'
            }
        ];
    }]);

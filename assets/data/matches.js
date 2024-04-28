const getMatchStats = async () => {
    let data = [
        {
            id: 1, 
            players: [
                {
                    id: 1, 
                    name: 'Desh', 
                    image: 'https://drive.usercontent.google.com/download?id=1fcWtZnqJspo6Q5l3ioBgrYHdQPJcrhJo',
                    team: 'white',
                    match_stt: 'won',
                    points: 9, //if normal one => 1 point, red_pot => 3 points
                    minus_points: 1,
                    red_pot: 1,
                },
                {
                    id: 2, 
                    name: 'Chanuki', 
                    image: 'https://drive.usercontent.google.com/download?id=1h5FRUM-7tt9zfGxxrjVOitOJZTCpZiw0',
                    team: 'white',
                    match_stt: 'won',
                    points: 2,
                    minus_points: 1,
                    red_pot: 0,
                },
                {
                    id: 3, 
                    name: 'Sam', 
                    image: 'https://drive.usercontent.google.com/download?id=1xVwDWcgKlJRzX4392wuYFejlQY-DAjI3',
                    team: 'black',
                    match_stt: 'lost',
                    points: 4,
                    minus_points: 1,
                    red_pot: 0,
                },
                {
                    id: 4, 
                    name: 'Melani', 
                    image: 'https://drive.usercontent.google.com/download?id=1yjfuXatkxeL9_kwvhBVdPlY2Ai1iZ4RL',
                    team: 'black',
                    match_stt: 'lost',
                    points: 4,
                    minus_points: 1,
                    red_pot: 0,
                },
            ],
            type: 'carrom',
            dateTime: new Date('2024-04-26T00:00:00'),
            handledBy: 'Desh',
            status: 'active'
        },
        {
            id: 2, 
            players: [
                {
                    id: 1, 
                    name: 'Desh', 
                    image: 'https://drive.usercontent.google.com/download?id=1fcWtZnqJspo6Q5l3ioBgrYHdQPJcrhJo',
                    team: 'white',
                    match_stt: 'won',
                    points: 10,
                    minus_points: 1,
                    red_pot: 1,
                },
                {
                    id: 4, 
                    name: 'Melani', 
                    image: 'https://drive.usercontent.google.com/download?id=1yjfuXatkxeL9_kwvhBVdPlY2Ai1iZ4RL',
                    team: 'white',
                    match_stt: 'won',
                    points: 1,
                    minus_points: 1,
                    red_pot: 0,
                },
                {
                    id: 2, 
                    name: 'Chanuki', 
                    image: 'https://drive.usercontent.google.com/download?id=1h5FRUM-7tt9zfGxxrjVOitOJZTCpZiw0',
                    team: 'black',
                    match_stt: 'lost',
                    points: 3,
                    minus_points: 1,
                    red_pot: 0,
                },
                {
                    id: 3, 
                    name: 'Sam', 
                    image: 'https://drive.usercontent.google.com/download?id=1xVwDWcgKlJRzX4392wuYFejlQY-DAjI3',
                    team: 'black',
                    match_stt: 'lost',
                    points: 4,
                    minus_points: 1,
                    red_pot: 0,
                },
            ],
            type: 'carrom',
            dateTime: new Date('2024-04-26T00:00:00'),
            handledBy: 'Desh',
            status: 'active'
        },
    ];

    return data;
}

export { getMatchStats }
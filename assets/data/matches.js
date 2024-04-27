const getMatchStats = async () => {
    let data = [
        {
            _id: 1, 
            players: [
                {
                    _id: 1, 
                    name: 'Desh', 
                    image: 'https://drive.usercontent.google.com/download?id=1fcWtZnqJspo6Q5l3ioBgrYHdQPJcrhJo',
                    team: 'A',
                    match_stt: 'won'
                },
                {
                    _id: 2, 
                    name: 'Chanuki', 
                    image: 'https://drive.usercontent.google.com/download?id=1h5FRUM-7tt9zfGxxrjVOitOJZTCpZiw0',
                    team: 'A',
                    match_stt: 'won'
                },
                {
                    _id: 3, 
                    name: 'Sam', 
                    image: 'https://drive.usercontent.google.com/download?id=1xVwDWcgKlJRzX4392wuYFejlQY-DAjI3',
                    team: 'B',
                    match_stt: 'lost'
                },
                {
                    _id: 4, 
                    name: 'Melani', 
                    image: 'https://drive.usercontent.google.com/download?id=1yjfuXatkxeL9_kwvhBVdPlY2Ai1iZ4RL',
                    team: 'B',
                    match_stt: 'lost'
                },
            ],
            type: 'carrom',
            dateTime: new Date('2024-04-26T00:00:00'),
            handledBy: 'Desh',
            status: 'active'
        },
        {
            _id: 2, 
            players: [
                {
                    _id: 1, 
                    name: 'Desh', 
                    image: 'https://drive.usercontent.google.com/download?id=1fcWtZnqJspo6Q5l3ioBgrYHdQPJcrhJo',
                    team: 'A',
                    match_stt: 'won'
                },
                {
                    _id: 4, 
                    name: 'Melani', 
                    image: 'https://drive.usercontent.google.com/download?id=1yjfuXatkxeL9_kwvhBVdPlY2Ai1iZ4RL',
                    team: 'A',
                    match_stt: 'won'
                },
                {
                    _id: 2, 
                    name: 'Chanuki', 
                    image: 'https://drive.usercontent.google.com/download?id=1h5FRUM-7tt9zfGxxrjVOitOJZTCpZiw0',
                    team: 'B',
                    match_stt: 'lost'
                },
                {
                    _id: 3, 
                    name: 'Sam', 
                    image: 'https://drive.usercontent.google.com/download?id=1xVwDWcgKlJRzX4392wuYFejlQY-DAjI3',
                    team: 'B',
                    match_stt: 'lost'
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
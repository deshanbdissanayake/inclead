const getPlayers = async () => {
    data = [
        {
            _id: 1, 
            name: 'Desh', 
            image: 'https://drive.usercontent.google.com/download?id=1fcWtZnqJspo6Q5l3ioBgrYHdQPJcrhJo',
            status: 'active'
        },
        {
            _id: 2, 
            name: 'Chanuki', 
            image: 'https://drive.usercontent.google.com/download?id=1h5FRUM-7tt9zfGxxrjVOitOJZTCpZiw0',
            status: 'active'
        },
        {
            _id: 3, 
            name: 'Sam', 
            image: 'https://drive.usercontent.google.com/download?id=1xVwDWcgKlJRzX4392wuYFejlQY-DAjI3',
            status: 'active'
        },
        {
            _id: 4, 
            name: 'Melani', 
            image: 'https://drive.usercontent.google.com/download?id=1yjfuXatkxeL9_kwvhBVdPlY2Ai1iZ4RL',
            status: 'active'
        },
    ];

    return data;
}

export { getPlayers }
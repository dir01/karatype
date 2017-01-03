import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import Tutor from './tutor/Tutor';

const levels = [
    {
        name: 'f j',
        texts: [
            'fj Jf fjfjfj jfjfjf fj Fjjfj fjffj jff Jffjf Jfjff jf fjjffjf Fjjfj',
            'jjfjfjf f Fjjfj jff Fjffjj Jfjffj fj FFjfFjf J jjff FjjfjFj fj JfjjfJf',
            'j f j f j f J F J F J F J F Fjffj Jfjf ffjjf fj Fjjfj Jffjf jff Jfjjf',
        ]
    },
    {
        name: 'd k',
        texts: [
            'dkkddd Kddkdd dk Kkdkd kdkddk Dkdkdd ddk kkdkdk Dkdkddk',
            'ddkd kddk kdkd d dkdkkd Dkddk kdd kDkkdd DkDkDk k kDkDkD',
            'kddkd k ddkKddk dkd Kkdkkdd ddkDkdk kddk Kdkkdkd DkKdDk kDdKd',
        ]
    },
    {
        name: 'd f j k',
        texts: [
            'kfkDJ dJfkj kdDf dfjk kjfd fjdk',
            'dFfk kJfd kkfD JDKF fkdj',
            'kJdf Fjdk dkfk kfkd fjdk kfdj',
        ]
    },
    {
        name: 's l',
        texts: [
            'slsl lsls ls Ls ls Ls',
            'sl Ls Sl SL lS',
        ]
    },
    {
        name: 's d f j k l',
        texts: [
            'DSL Fsl dll skd fkd lkd skl Jkdl',
            'lkd LSD fsk Jds Klld skd Kdj',
            'fls DJs kll dks skd fskd dkls',
        ]
    },
    {
        name: 'a s d f j k l ;',
        texts: [
            'as; sad dask klassd; Jakd Sajl Jals',
            'sad ass askd Jak lss dafd laj; saj',
            'fad Dak las fals ask; ads laks klass saj',
        ]
    },
    {
        name: 'a s d f g h j k l ;',
        texts: [
            'gh hg Gh Hg gg Hash Gas sag Glass',
            'h g Gh Hag Gash lags sag ass Ghasl lash',
            'Ghasl Slags Glass Jag jgl jakd la ass shag',
        ]
    }
];

let tutor = new Tutor(levels, 0);


ReactDOM.render(
    <App tutor={ tutor }/>,
    document.getElementById('root')
);

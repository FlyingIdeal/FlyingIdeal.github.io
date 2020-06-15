/*
 *图片数据
 */
//马车
var horseImgData = {
    'partBgObj': {
        'name': 'horseBg',
        'w': 1334,
        'h': 750,
        'x': 20,
        'y': -10,
        'z': 0,
        'src': 'images/horseBg.jpg'
    },
    'planeArr': [{
        'planes': [{
            'name': 'horsep1_1',
            'w': 592,
            'h': 76,
            'x': 280,
            'y': 480,
            'z': 0,
            'src': 'images/horsep1_1.png'
        }],
        'v': 0,
        'h': 0,
        'name': 'horse_1',
        'cartoon': 'fadeIn'
    }]
}

//过去
var oldPlaneImgData = {
    'partBgObj': {
        'name': 'oldBg',
        'w': 1334,
        'h': 750,
        'x': 20,
        'y': -10,
        'z': 0,
        'src': 'images/oldBg.jpg'
    },
    'planeArr': [{
        'planes': [
        /*{
            'name': 'op1_1',
            'w': 1138,
            'h': 640,
            'x': 0,
            'y': -50,
            'z': 100,
            'src': 'images/op1_1.png'
        }, */
        {
            'name': 'op1_2',
            'w': 624,
            'h': 262,
            'x': 268,
            'y': 100,
            'z': 100,
            'src': 'images/op1_2.png'
        }],
        'v': 0,
        'h': 1,
        'name': 'old_1',
        'cartoon': 'fadeIn'
    }, {
        'planes': [{
            'name': 'op2_1',
            'w': 510,
            'h': 324,
            'x': 100,
            'y': 120,
            'z': -40,
            'src': 'images/op2_1.png'
        }, {
            'name': 'op2_2',
            'w': 291,
            'h': 90,
            'x': 600,
            'y': 380,
            'z': 50,
            'src': 'images/op2_2.png'
        }],
        'v': 0,
        'h': 1,
        'name': 'old_2',
        'cartoon': 'fadeIn'
    }, {
        'planes': [{
            'name': 'op3_1',
            'w': 286,
            'h': 471,
            'x': 250,
            'y': 60,
            'z': -40,
            'src': 'images/op3_1.png'
        }, {
            'name': 'op3_2',
            'w': 237,
            'h': 90,
            'x': 550,
            'y': 380,
            'z': 50,
            'src': 'images/op3_2.png'
        }],
        'v': 0,
        'h': 2,
        'name': 'old_3',
        'cartoon': 'leftIn'
    }, {
        'planes': [{
            'name': 'op4_1',
            'w': 545,
            'h': 358,
            'x': 160,
            'y': 120,
            'z': -40,
            'src': 'images/op4_1.png'
        }, {
            'name': 'op4_2',
            'w': 234,
            'h': 90,
            'x': 650,
            'y': 380,
            'z': 50,
            'src': 'images/op4_2.png'
        }],
        'v': 0,
        'h': 3,
        'name': 'old_4',
        'cartoon': 'rightIn'
    }, {
        'planes': [{
            'name': 'op5_1',
            'w': 537,
            'h': 368,
            'x': 160,
            'y': 120,
            'z': -40,
            'src': 'images/op5_1.png'
        }, {
            'name': 'op5_2',
            'w': 412,
            'h': 90,
            'x': 470,
            'y': 380,
            'z': 50,
            'src': 'images/op5_2.png'
        }],
        'v': 0,
        'h': 4,
        'name': 'old_5',
        'cartoon': 'leftIn'
    }, {
        'planes': [{
            'name': 'op6_1',
            'w': 524,
            'h': 397,
            'x': 200,
            'y': 180,
            'z': -40,
            'src': 'images/op6_1.png'
        }, {
            'name': 'op6_2',
            'w': 266,
            'h': 91,
            'x': 680,
            'y': 400,
            'z': 50,
            'src': 'images/op6_2.png'
        }],
        'v': 0,
        'h': 5,
        'name': 'old_6',
        'cartoon': 'rightIn'
    }, {
        'planes': [{
            'name': 'op7_1',
            'w': 583,
            'h': 368,
            'x': 80,
            'y': 160,
            'z': -40,
            'src': 'images/op7_1.png'
        }, {
            'name': 'op7_2',
            'w': 454,
            'h': 90,
            'x': 520,
            'y': 420,
            'z': 50,
            'src': 'images/op7_2.png'
        }],
        'v': 0,
        'h': 6,
        'name': 'old_7',
        'cartoon': 'rightIn'
    }]
};

//现在
var nowPlaneImgData = {
    'partBgObj': {
        'name': 'nowBg',
        'w': 1334,
        'h': 750,
        'x': 20,
        'y': -10,
        'src': 'images/nowBg.jpg'
    },
    'planeArr': [{
        'planes': [{
            'name': 'np1_1',
            'w': 756,
            'h': 310,
            'x': 180,
            'y': 160,
            'z': -40,
            'src': 'images/np1_1.png'
        }, {
            'name': 'np1_2',
            'w': 689,
            'h': 136,
            'x': 280,
            'y': 370,
            'z': 50,
            'src': 'images/np1_2.png'
        }],
        'v': 0,
        'h': 1,
        'name': 'now_1',
        'cartoon': 'leftIn'
    }, {
        'planes': [{
            'name': 'np2_1',
            'w': 670,
            'h': 360,
            'x': 215,
            'y': 160,
            'z': -40,
            'src': 'images/np2_1.png'
        }, {
            'name': 'np2_2',
            'w': 471,
            'h': 136,
            'x': 300,
            'y': 380,
            'z': 50,
            'src': 'images/np2_2.png'
        }],
        'v': 0,
        'h': 1,
        'name': 'now_2',
        'cartoon': 'bigIn'
    }, {
        'planes': [{
            'name': 'np3_1',
            'w': 880,
            'h': 342,
            'x': 180,
            'y': 160,
            'z': -40,
            'src': 'images/np3_1.png'
        }, {
            'name': 'np3_2',
            'w': 590,
            'h': 137,
            'x': 300,
            'y': 380,
            'z': 50,
            'src': 'images/np3_2.png'
        }],
        'v': 0,
        'h': 2,
        'name': 'now_3',
        'cartoon': 'rightIn'
    }, {
        'planes': [{
            'name': 'np4_1',
            'w': 754,
            'h': 280,
            'x': 180,
            'y': 200,
            'z': -40,
            'src': 'images/np4_1.png'
        }, {
            'name': 'np4_2',
            'w': 583,
            'h': 137,
            'x': 270,
            'y': 380,
            'z': 50,
            'src': 'images/np4_2.png'
        }],
        'v': 0,
        'h': 3,
        'name': 'now_4',
        'cartoon': 'rightIn'
    }, {
        'planes': [{
            'name': 'np5_1',
            'w': 770,
            'h': 296,
            'x': 180,
            'y': 200,
            'z': -40,
            'src': 'images/np5_1.png'
        }, {
            'name': 'np5_2',
            'w': 671,
            'h': 135,
            'x': 270,
            'y': 380,
            'z': 50,
            'src': 'images/np5_2.png'
        }],
        'v': 0,
        'h': 4,
        'name': 'now_5',
        'cartoon': 'rightIn'
    }]
};

//将来
var futurePlaneImgData = {
    'partBgObj': {
        'name': 'futureBg',
        'w': 1334,
        'h': 750,
        'x': 20,
        'y': -10,
        'src': 'images/futureBg.jpg'
    },
    'planeArr': [{
        'planes': [{
            'name': 'fp1_1',
            'w': 508,
            'h': 508,
            'x': 60,
            'y': 60,
            'z': -40,
            'src': 'images/fp1_1.png'
        }, {
            'name': 'fp1_2',
            'w': 422,
            'h': 177,
            'x': 540,
            'y': 200,
            'z': 50,
            'src': 'images/fp1_2.png'
        }],
        'v': 0,
        'h': 1,
        'name': 'fut_1',
        'cartoon': 'leftIn'
    }, {
        'planes': [{
            'name': 'fp2_1',
            'w': 760,
            'h': 385,
            'x': -80,
            'y': 180,
            'z': -40,
            'src': 'images/fp2_1.png'
        }, {
            'name': 'fp2_2',
            'w': 422,
            'h': 135,
            'x': 640,
            'y': 260,
            'z': 50,
            'src': 'images/fp2_2.png'
        }],
        'v': 0,
        'h': 1,
        'name': 'fut_2',
        'cartoon': 'rightIn'
    }, {
        'planes': [{
            'name': 'fp3_1',
            'w': 678,
            'h': 450,
            'x': -40,
            'y': 140,
            'z': -40,
            'src': 'images/fp3_1.png'
        }, {
            'name': 'fp3_2',
            'w': 371,
            'h': 177,
            'x': 640,
            'y': 260,
            'z': 50,
            'src': 'images/fp3_2.png'
        }],
        'v': 0,
        'h': 2,
        'name': 'fut_3',
        'cartoon': 'fadeIn'
    }, {
        'planes': [{
            'name': 'fp4_1',
            'w': 720,
            'h': 370,
            'x': -80,
            'y': 180,
            'z': -40,
            'src': 'images/fp4_1.png'
        }, {
            'name': 'fp4_2',
            'w': 350,
            'h': 137,
            'x': 660,
            'y': 260,
            'z': 50,
            'src': 'images/fp4_2.png'
        }],
        'v': 0,
        'h': 3,
        'name': 'fut_4',
        'cartoon': 'leftIn'
    }]
};

//car
var carPlaneImgData = {
    'partBgObj': {
        'name': 'carBg',
        'w': 1334,
        'h': 750,
        'x': 20,
        'y': -10,
        'src': 'images/carBg.jpg'
    },
    'planeArr': [{
        'planes': [{
            'name': 'cp1_1',
            'w': 714,
            'h': 411,
            'x': -80,
            'y': 140,
            'z': -40,
            'src': 'images/cp1_1.png'
        }, {
            'name': 'cp1_2',
            'w': 507,
            'h': 136,
            'x': 560,
            'y': 360,
            'z': 50,
            'src': 'images/cp1_2.png'
        }],
        'v': 0,
        'h': 1,
        'name': 'car_1',
        'cartoon': 'leftRoomIn'
    }, {
        'planes': [{
            'name': 'cp2_1',
            'w': 873,
            'h': 278,
            'x': -80,
            'y': 140,
            'z': -40,
            'src': 'images/cp2_1.png'
        }, {
            'name': 'cp2_2',
            'w': 616,
            'h': 136,
            'x': 460,
            'y': 360,
            'z': 50,
            'src': 'images/cp2_2.png'
        }],
        'v': 0,
        'h': 2,
        'name': 'car_2',
        'cartoon': 'rightIn'
    }, {
        'planes': [{
            'name': 'cp3_1',
            'w': 855,
            'h': 484,
            'x': 380,
            'y': 140,
            'z': -40,
            'src': 'images/cp3_1.png'
        }, {
            'name': 'cp3_2',
            'w': 689,
            'h': 137,
            'x': 100,
            'y': 360,
            'z': 50,
            'src': 'images/cp3_2.png'
        }],
        'v': 0,
        'h': 3,
        'name': 'car_3',
        'cartoon': 'leftZoomIn'
    }, {
        'planes': [{
            'name': 'cp4_1',
            'w': 689,
            'h': 243,
            'x': 220,
            'y': 140,
            'z': 0,
            'src': 'images/cp4_1.png'
        }],
        'v': 0,
        'h': 4,
        'name': 'car_4',
        'cartoon': 'fadeIn'
    }]
}
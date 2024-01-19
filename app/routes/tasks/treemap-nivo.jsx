import { ResponsiveTreeMap } from '@nivo/treemap'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

export const vdata = {
    name: "nivo",
    color: "hsl(47, 70%, 50%)",
    children: [
        {
            name: "viz",
            color: "hsl(267, 70%, 50%)",
            children: [
                {
                    name: "stack",
                    color: "hsl(314, 70%, 50%)",
                    children: [
                        {
                            name: "cchart",
                            color: "hsl(87, 70%, 50%)",
                            loc: 55073
                        },
                        {
                            name: "xAxis",
                            color: "hsl(326, 70%, 50%)",
                            loc: 59642
                        },
                        {
                            name: "yAxis",
                            color: "hsl(132, 70%, 50%)",
                            loc: 72387
                        },
                        {
                            name: "layers",
                            color: "hsl(139, 70%, 50%)",
                            loc: 120621
                        }
                    ]
                },
                {
                    name: "ppie",
                    color: "hsl(262, 70%, 50%)",
                    children: [
                        {
                            name: "chart",
                            color: "hsl(243, 70%, 50%)",
                            children: [
                                {
                                    name: "pie",
                                    color: "hsl(156, 70%, 50%)",
                                    children: [
                                        {
                                            name: "outline",
                                            color: "hsl(325, 70%, 50%)",
                                            loc: 69640
                                        },
                                        {
                                            name: "slices",
                                            color: "hsl(140, 70%, 50%)",
                                            loc: 167285
                                        },
                                        {
                                            name: "bbox",
                                            color: "hsl(230, 70%, 50%)",
                                            loc: 72112
                                        }
                                    ]
                                },
                                {
                                    name: "donut",
                                    color: "hsl(308, 70%, 50%)",
                                    loc: 173577
                                },
                                {
                                    name: "gauge",
                                    color: "hsl(20, 70%, 50%)",
                                    loc: 987
                                }
                            ]
                        },
                        {
                            name: "legends",
                            color: "hsl(58, 70%, 50%)",
                            loc: 78975
                        }
                    ]
                }
            ]
        },
        {
            name: "colors",
            color: "hsl(83, 70%, 50%)",
            children: [
                {
                    name: "rgb",
                    color: "hsl(196, 70%, 50%)",
                    loc: 113967
                },
                {
                    name: "hsl",
                    color: "hsl(87, 70%, 50%)",
                    loc: 126586
                }
            ]
        },
        {
            name: "utils",
            color: "hsl(40, 70%, 50%)",
            children: [
                {
                    name: "randomize",
                    color: "hsl(183, 70%, 50%)",
                    loc: 155846
                },
                {
                    name: "resetClock",
                    color: "hsl(235, 70%, 50%)",
                    loc: 7988
                },
                {
                    name: "noop",
                    color: "hsl(63, 70%, 50%)",
                    loc: 8803
                },
                {
                    name: "tick",
                    color: "hsl(216, 70%, 50%)",
                    loc: 124159
                },
                {
                    name: "forceGC",
                    color: "hsl(137, 70%, 50%)",
                    loc: 15219
                },
                {
                    name: "stackTrace",
                    color: "hsl(165, 70%, 50%)",
                    loc: 10991
                },
                {
                    name: "dbg",
                    color: "hsl(132, 70%, 50%)",
                    loc: 21237
                }
            ]
        },
        {
            name: "generators",
            color: "hsl(107, 70%, 50%)",
            children: [
                {
                    name: "address",
                    color: "hsl(34, 70%, 50%)",
                    loc: 153157
                },
                {
                    name: "city",
                    color: "hsl(311, 70%, 50%)",
                    loc: 114674
                },
                {
                    name: "animal",
                    color: "hsl(121, 70%, 50%)",
                    loc: 169242
                },
                {
                    name: "movie",
                    color: "hsl(155, 70%, 50%)",
                    loc: 116858
                },
                {
                    name: "user",
                    color: "hsl(51, 70%, 50%)",
                    loc: 120543
                }
            ]
        },
        {
            name: "set",
            color: "hsl(200, 70%, 50%)",
            children: [
                {
                    name: "clone",
                    color: "hsl(81, 70%, 50%)",
                    loc: 142931
                },
                {
                    name: "intersect",
                    color: "hsl(109, 70%, 50%)",
                    loc: 63808
                },
                {
                    name: "merge",
                    color: "hsl(299, 70%, 50%)",
                    loc: 74551
                },
                {
                    name: "reverse",
                    color: "hsl(329, 70%, 50%)",
                    loc: 101353
                },
                {
                    name: "toArray",
                    color: "hsl(97, 70%, 50%)",
                    loc: 45395
                },
                {
                    name: "toObject",
                    color: "hsl(237, 70%, 50%)",
                    loc: 111176
                },
                {
                    name: "fromCSV",
                    color: "hsl(76, 70%, 50%)",
                    loc: 195838
                },
                {
                    name: "slice",
                    color: "hsl(68, 70%, 50%)",
                    loc: 125406
                },
                {
                    name: "append",
                    color: "hsl(141, 70%, 50%)",
                    loc: 176642
                },
                {
                    name: "prepend",
                    color: "hsl(174, 70%, 50%)",
                    loc: 13053
                },
                {
                    name: "shuffle",
                    color: "hsl(24, 70%, 50%)",
                    loc: 181391
                },
                {
                    name: "pick",
                    color: "hsl(185, 70%, 50%)",
                    loc: 126864
                },
                {
                    name: "plouc",
                    color: "hsl(193, 70%, 50%)",
                    loc: 175158
                }
            ]
        },
        {
            name: "text",
            color: "hsl(240, 70%, 50%)",
            children: [
                {
                    name: "trim",
                    color: "hsl(21, 70%, 50%)",
                    loc: 30960
                },
                {
                    name: "slugify",
                    color: "hsl(143, 70%, 50%)",
                    loc: 85201
                },
                {
                    name: "snakeCase",
                    color: "hsl(247, 70%, 50%)",
                    loc: 86005
                },
                {
                    name: "camelCase",
                    color: "hsl(67, 70%, 50%)",
                    loc: 110096
                },
                {
                    name: "repeat",
                    color: "hsl(264, 70%, 50%)",
                    loc: 178892
                },
                {
                    name: "padLeft",
                    color: "hsl(299, 70%, 50%)",
                    loc: 124066
                },
                {
                    name: "padRight",
                    color: "hsl(301, 70%, 50%)",
                    loc: 122437
                },
                {
                    name: "sanitize",
                    color: "hsl(309, 70%, 50%)",
                    loc: 23958
                },
                {
                    name: "ploucify",
                    color: "hsl(187, 70%, 50%)",
                    loc: 120517
                }
            ]
        },
        {
            name: "misc",
            color: "hsl(239, 70%, 50%)",
            children: [
                {
                    name: "greetings",
                    color: "hsl(257, 70%, 50%)",
                    children: [
                        {
                            name: "hey",
                            color: "hsl(17, 70%, 50%)",
                            loc: 52809
                        },
                        {
                            name: "HOWDY",
                            color: "hsl(129, 70%, 50%)",
                            loc: 106466
                        },
                        {
                            name: "aloha",
                            color: "hsl(318, 70%, 50%)",
                            loc: 5468
                        },
                        {
                            name: "AHOY",
                            color: "hsl(76, 70%, 50%)",
                            loc: 172789
                        }
                    ]
                },
                {
                    name: "other",
                    color: "hsl(265, 70%, 50%)",
                    loc: 181252
                },
                {
                    name: "path",
                    color: "hsl(19, 70%, 50%)",
                    children: [
                        {
                            name: "pathA",
                            color: "hsl(75, 70%, 50%)",
                            loc: 156118
                        },
                        {
                            name: "pathB",
                            color: "hsl(254, 70%, 50%)",
                            children: [
                                {
                                    name: "pathB1",
                                    color: "hsl(279, 70%, 50%)",
                                    loc: 27571
                                },
                                {
                                    name: "pathB2",
                                    color: "hsl(161, 70%, 50%)",
                                    loc: 104277
                                },
                                {
                                    name: "pathB3",
                                    color: "hsl(305, 70%, 50%)",
                                    loc: 55906
                                },
                                {
                                    name: "pathB4",
                                    color: "hsl(56, 70%, 50%)",
                                    loc: 71549
                                }
                            ]
                        },
                        {
                            name: "pathC",
                            color: "hsl(124, 70%, 50%)",
                            children: [
                                {
                                    name: "pathC1",
                                    color: "hsl(197, 70%, 50%)",
                                    loc: 107352
                                },
                                {
                                    name: "pathC2",
                                    color: "hsl(159, 70%, 50%)",
                                    loc: 150701
                                },
                                {
                                    name: "pathC3",
                                    color: "hsl(22, 70%, 50%)",
                                    loc: 115120
                                },
                                {
                                    name: "pathC4",
                                    color: "hsl(210, 70%, 50%)",
                                    loc: 52595
                                },
                                {
                                    name: "pathC5",
                                    color: "hsl(79, 70%, 50%)",
                                    loc: 44647
                                },
                                {
                                    name: "pathC6",
                                    color: "hsl(220, 70%, 50%)",
                                    loc: 8248
                                },
                                {
                                    name: "pathC7",
                                    color: "hsl(279, 70%, 50%)",
                                    loc: 18090
                                },
                                {
                                    name: "pathC8",
                                    color: "hsl(25, 70%, 50%)",
                                    loc: 138074
                                },
                                {
                                    name: "pathC9",
                                    color: "hsl(271, 70%, 50%)",
                                    loc: 45729
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
export const NivoResponsiveTreeMap = ({ data /* see data tab */ }) => (
    <ResponsiveTreeMap
        data={data}
        identity="name"
        value="loc"
        valueFormat=".02s"
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        labelSkipSize={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.2
                ]
            ]
        }}
        parentLabelPosition="left"
        parentLabelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.1
                ]
            ]
        }}
    />
)
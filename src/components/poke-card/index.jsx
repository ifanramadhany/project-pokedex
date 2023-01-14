import React, {useEffect, useState} from 'react';
import "./poke-card.scss"
import {pokeball, pokeballColor} from "../../assets";
import {Backdrop, Box, Drawer, IconButton, Modal, SvgIcon, Tab, Tabs} from '@mui/material';
import colors from "../../scss/variables.module.scss"
import PropTypes from 'prop-types';
import {CustomButton} from "../index";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {fetchPokemonDetail, setAllCollections} from "../../store/actions/itemAction";
import Lottie from 'react-lottie';
import * as animationData from '../../lotties/pokeball-animation.json'

const PokeCard = ({item}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const errorImgSrc = pokeballColor;
    const [dataCollection, setDataCollection] = useState({})
    const [modal, setModal] = useState(false)
    const [modalFailed, setModalFailed] = useState(false)
    const [backdrop, setBackdrop] = useState(false)
    const [pokeDetail, setPokeDetail] = useState(null)
    const [drawerState, setDrawerState] = useState(false);
    const [value, setValue] = useState(0);
    const [textInput, setTextInput] = useState('');

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    const ArrowRight = (props) => (
        <SvgIcon xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
            <path fill="currentColor"
                  d="M16.62 2.99a1.25 1.25 0 0 0-1.77 0L6.54 11.3a.996.996 0 0 0 0 1.41l8.31 8.31c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.38 12l7.25-7.25c.48-.48.48-1.28-.01-1.76z"></path>
        </SvgIcon>
    );

    const toggleDrawer = () => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerState(!drawerState);
    };

    const toggleBackdrop = () => {
        setBackdrop(true)
        const randomBoolean = Math.random() < 0.5
        let newCollection = pokeDetail
        newCollection.idCollection = 'id' + (new Date()).getTime();
        setTimeout(() => {
            setBackdrop(false)
            if (randomBoolean) {
                setDataCollection(newCollection)
                setModal(true)
            } else {
                setModalFailed(true)
            }
        }, "2000")
    }

    const saveHandler = () => {
        let newObject = dataCollection
        newObject.pokeNickname = textInput
        dispatch(setAllCollections(newObject))
        navigate("/collection")
    }

    const handleTextInputChange = (event) => {
        setTextInput(event.target.value);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function TabPanel(props) {
        const {children, value, index, ...other} = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <React.Fragment>
                        {children}
                    </React.Fragment>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    function convertNumber(number) {
        const str = "" + number
        const pad = "000"
        return pad.substring(0, pad.length - str.length) + str
    }

    function arrayToString(data, type) {
        let array = []
        data.map((item) => array.push(item[type].name))
        return array.join(", ")
    }

    function statComp(stat, index) {
        if (stat > 55) {
            return <span key={index} className="good">{stat}</span>
        } else {
            return <span key={index} className="bad">{stat}</span>
        }
    }

    const ReactBackdrop = () => {
        return (
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={backdrop}
            >
                <Lottie options={defaultOptions}
                        height={250}
                        width={250}
                />
            </Backdrop>
        )
    }

    const ReactModalSuccess = () => {
        return (
            <Modal
                open={modal}
                disableRestoreFocus
                hideBackdrop
            >
                <div id="modal-success-wrapper" className="flex justify-center items-center drop-shadow-xl">
                    <div className="modal-success flex flex-col gap-3">
                        <div className="flex flex-col justify-center items-center">
                            <span className="success-text">You've successfully caught a Pokemon</span>
                            <span>Please give a nickname!</span>
                        </div>
                        <input autoFocus value={textInput} onChange={handleTextInputChange} placeholder="Nickname"/>
                        <div className="flex justify-center items-center gap-4">
                            <CustomButton onClick={() => setModal(false)} buttonName={"Cancel"}
                                          buttonColor={colors.redBackgroundColor}></CustomButton>
                            <CustomButton onClick={() => saveHandler()} buttonColor={colors.greenButtonColor} buttonName={"Save"}></CustomButton>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }

    const ReactModalFailed = () => {
        return (
            <Modal
                open={modalFailed}
            >
                <div id="modal-success-wrapper" className="flex justify-center items-center">
                    <div className="modal-success flex flex-col gap-3">
                        <div className="flex flex-col justify-center items-center">
                            <span className="failed-text">Sorry!!</span>
                            <span className="failed-text">You've failed to catch a Pokemon</span>
                        </div>
                        <div className="flex justify-center items-center gap-4">
                            <CustomButton onClick={() => setModalFailed(false)} buttonName={"Cancel"}
                                          buttonColor={colors.redBackgroundColor}></CustomButton>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }

    useEffect(() => {
        dispatch(fetchPokemonDetail(item.name))
            .then((result) => {
                setPokeDetail(result)
            })
            .catch((err) => {
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!pokeDetail) {
        return <div id="skeleton-poke-card" className="animate-pulse"></div>
    }

    return (
        <React.Fragment>
            <ReactModalFailed></ReactModalFailed>
            <ReactModalSuccess></ReactModalSuccess>
            <ReactBackdrop></ReactBackdrop>
            <Drawer
                anchor={"left"}
                open={drawerState}
                onClose={() => toggleDrawer()}
                sx={{
                    "& .MuiPaper-root": {
                        width: "100%",
                        height: "100%",
                        overflowX: "hidden",
                        overflowY: "auto"
                    }
                }}
            >
                <div id="drawer-detail" className="flex flex-col">
                    <img className="pokeball-img" src={pokeball} alt="pokeball"/>
                    <div className="top-section">
                        <div className="back-icon">
                            <IconButton onClick={toggleDrawer()}>
                                <ArrowRight
                                    sx={{
                                        fontSize: "1.7em",
                                        color: colors.textColor
                                    }}/>
                            </IconButton>
                        </div>
                        <div className="id-name flex flex-col">
                            <span className="id">#{convertNumber(pokeDetail.id)}</span>
                            <span className="name">{item.name}</span>
                        </div>
                    </div>
                    <div className="bottom-section flex flex-col">
                        <div className="poke-img-wrapper">
                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeDetail.id}.png`}
                                alt="pokemon img" onError={(e) => e.target.src = errorImgSrc}/>
                        </div>
                        <div className="tabs-wrapper">
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <Tabs variant="fullWidth"
                                      TabIndicatorProps={{style: {background: colors.activeNavbarColor}}} value={value}
                                      onChange={handleChange} centered>
                                    <Tab sx={{textTransform: "none"}} label="About" {...a11yProps(0)} />
                                    <Tab sx={{textTransform: "none"}} label="Base Status" {...a11yProps(1)} />
                                    <Tab sx={{textTransform: "none"}} label="Moves" {...a11yProps(2)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                                <div className="tab-panel flex">
                                    <div className="left flex flex-col">
                                        <span>Name</span>
                                        <span>Height</span>
                                        <span>Weight</span>
                                        <span>Types</span>
                                        <span>Abilities</span>
                                    </div>
                                    <div className="right flex flex-col">
                                        <span>: {item.name}</span>
                                        <span>: {pokeDetail.height}</span>
                                        <span>: {pokeDetail.weight}</span>
                                        <span>: {arrayToString(pokeDetail.types, "type")}</span>
                                        <span>: {arrayToString(pokeDetail.abilities, "ability")}</span>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <div className="tab-panel-base-status flex">
                                    <div className="left flex flex-col">
                                        <span>Hp</span>
                                        <span>Attack</span>
                                        <span>Defence</span>
                                        <span>Special-Attack</span>
                                        <span>Special-Defense</span>
                                        <span>Speed</span>
                                    </div>
                                    <div className="right flex flex-col">
                                        {
                                            pokeDetail.stats.map((item, index) => {
                                                return (
                                                    statComp(item.base_stat, index)
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <div className="tab-panel-moves flex">
                                    <div className="left flex flex-col">
                                        {
                                            pokeDetail.moves.map((item, index) => {
                                                return (
                                                    <span key={index}>{item.move.name}</span>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </TabPanel>
                        </div>
                    </div>
                    <div className="button-wrapper">
                        <CustomButton onClick={() => toggleBackdrop()} buttonName={"Catch"}
                                      buttonWidth={"100%"}></CustomButton>
                    </div>
                </div>
            </Drawer>
            <div onClick={toggleDrawer()} id="poke-card">
                <img className="pokeball-img-on-card" src={pokeball} alt="pokeball img"/>
                <div className="name-and-id flex justify-between items-center">
                    <span className="name">{item.name}</span>
                    <span className="id">#{convertNumber(pokeDetail.id)}</span>
                </div>
                <div className="type-skill-img flex">
                    <div className="type-skill flex flex-col gap-1">
                        <span>{pokeDetail.types[0] ? pokeDetail.types[0].type.name : "-"}</span>
                        <span>{pokeDetail.types[1] ? pokeDetail.types[1].type.name : "-"}</span>
                    </div>
                    <div className="img">
                        <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeDetail.id}.png`}
                            alt="pokemon img" onError={(e) => e.target.src = errorImgSrc}/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default PokeCard;

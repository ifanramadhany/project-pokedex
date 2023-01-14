import React, {useState} from 'react';
import "./poke-card-collection.scss"
import {pokeball, pokeballColor} from "../../assets";
import {Box, Drawer, IconButton, Modal, SvgIcon, Tab, Tabs} from "@mui/material";
import colors from "../../scss/variables.module.scss";
import {CustomButton} from "../index";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import {deleteCollection} from "../../store/actions/itemAction";

const PokeCardCollection = ({item}) => {
    const dispatch = useDispatch();
    const errorImgSrc = pokeballColor;
    const [drawerState, setDrawerState] = useState(false);
    const [modal, setModal] = useState(false)
    const [value, setValue] = useState(0);
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

    const releasePokemon = () => {
        dispatch(deleteCollection(item.idCollection))
        setDrawerState(false)
    }

    const ReactModalDelete = () => {
        return (
            <Modal
                open={modal}
            >
                <div id="modal-success-wrapper" className="flex justify-center items-center drop-shadow-xl">
                    <div className="modal-success flex flex-col gap-3">
                        <div className="flex flex-col justify-center items-center">
                            <span className="success-text">Are you sure to delete your collection?</span>
                        </div>
                        <div className="flex justify-center items-center gap-4">
                            <CustomButton onClick={() => setModal(false)} buttonName={"Cancel"}
                                          buttonColor={colors.redBackgroundColor}></CustomButton>
                            <CustomButton onClick={() => releasePokemon()} buttonColor={colors.greenButtonColor} buttonName={"Yes"}></CustomButton>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }

    return (
        <React.Fragment>
            <ReactModalDelete></ReactModalDelete>
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
                <div id="drawer-detail-collection" className="flex flex-col">
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
                        <div className="collect-id-name flex flex-col">
                            <span className="collect">Your Collection</span>
                            <span className="id">#{convertNumber(item.id)}</span>
                            <span className="name">{`${item.name} (${item.pokeNickname})`}</span>
                        </div>
                    </div>
                    <div className="bottom-section flex flex-col">
                        <div className="poke-img-wrapper">
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`} alt="pokemon img" onError={(e) => e.target.src = errorImgSrc}/>
                        </div>
                        <div className="tabs-wrapper">
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <Tabs variant="fullWidth" TabIndicatorProps={{style: {background: colors.activeNavbarColor}}} value={value}
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
                                        <span>: {item.height}</span>
                                        <span>: {item.weight}</span>
                                        <span>: {arrayToString(item.types, "type")}</span>
                                        <span>: {arrayToString(item.abilities, "ability")}</span>
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
                                            item.stats.map((item, index) => {
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
                                            item.moves.map((item, index) => {
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
                        <CustomButton onClick={() => setModal(true)} buttonColor={colors.redBackgroundColor} buttonName={"Release"} buttonWidth={"100%"}></CustomButton>
                    </div>
                </div>
            </Drawer>
            <div onClick={toggleDrawer()} id="poke-collection-card" className="flex">
                <div className="poke-img">
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`} alt="pokemon img" onError={(e) => e.target.src = errorImgSrc}/>
                </div>
                <div className="poke-detail">
                    <div className="poke-name-nick-name flex gap-1.5">
                        <span className="poke-name">{item.name}</span>
                        <span className="nick-name">({item.pokeNickname})</span>
                    </div>
                    <div className="type-skill flex gap-1.5">
                        <span>{item.types[0] ? item.types[0].type.name : "-"}</span>
                        <span>{item.types[1] ? item.types[1].type.name : "-"}</span>
                    </div>
                </div>
                <span className="id">#{convertNumber(item.id)}</span>
            </div>
        </React.Fragment>
    );
};

export default PokeCardCollection;

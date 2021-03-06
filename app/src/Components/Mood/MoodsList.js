import React, { useState, useEffect } from 'react';
import { getMoodData, getTopMoodsToday } from '../../Data/WebsiteByMood.js';
import {
  PieChart, Pie, Tooltip
} from 'recharts';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import {
  Button, Grid, ButtonGroup, Paper, Popper, Box,
  MenuItem, MenuList, Grow, Container
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './../LandingPage/Sections/Theme.js';



// I only imported the elements of recharts that I needed, there are a lot more you can use

const useStyles = makeStyles((theme) => ({
  mar: {
    width: '150px',
    // paddingLeft: theme.spacing(2),
    // paddingRight: theme.spacing(2),
    fontSize: 14,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    // padding: theme.spacing(0.5)
    // display: 'flex',
    // justifyContent: 'center'
    // marginRight: theme.spacing(5)
  },
  pad: {
    padding: theme.spacing(5),
    backgroundColor: '#0069d9',
  },
  bg: {
    marginTop: theme.spacing(8),
    // marginLeft: theme.spacing(2)
    // alignContent: 'center'
    // display: 'grid',
    // justifyContent: 'center'
  },
  flex: {
    display: 'flex',
    marginLeft: theme.spacing(5),
  },
  buttonContainer: {
    // paddingRight: theme.spacing(5),
    // paddingLeft: theme.spacing(5),
    width: '100%'
  },
  break: {
    flexBasis: '100%',
    height: 0
  }
}));


export default function MoodsList(props) {
  const classes = useStyles();

  // const [loading, setLoading] = useState(true);
  // const [selected, setSelected] = useState(0);
  const [selected, setSelected] = useState('outlined');

  //
  const [allMoods, setAllMoods] = useState([]);
  const [allMoods1, setAllMoods1] = useState([]);
  const [allMoods2, setAllMoods2] = useState([]);

  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  //
  const handleClick = () => {
    console.info(`You clicked ${allMoods[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const selectThis = (i) => {
    setSelected('contained');
  }

  useEffect(() => {
    // Function to create buttons for each mood.
    // It works but it might be better to just have it hard coded
    // since it never changes
    const setMoodData = (e) => {
      const mood = e.target.className;
      props.setCurrentMood(mood);
    };

    function createButtons() {
      // console.log("createButtons run");
      // var [orderedMoods, moodFrequency] = await getTopMoodsToday();
      const orderedMoods = props.orderedMoods;
      const moodFrequency = props.moodFrequency;

      // console.log(typeof []);

      var allMoods = [
        'Anxious', 'Sad', 'Happy', 'Tired',
        'Energized', 'Frustrated', 'Calm',
        'Distracted', 'Focused', 'Lonely'
      ];
      allMoods = allMoods.filter((el) => !orderedMoods.includes(el));
      allMoods = orderedMoods.concat(allMoods);

      for (var i = 0; i < allMoods.length; i++) {
        if (moodFrequency[allMoods[i]] == undefined) {
          moodFrequency[allMoods[i]] = 0;
        }
      }

      setAllMoods(allMoods);

      let pieChartData = [];
      allMoods.forEach(function (mood) {
        if (moodFrequency[mood] === 0) {
          pieChartData.push({
            name: mood,
            value: 0
          });
        }
        else {
          pieChartData.push({
            name: mood,
            value: moodFrequency[mood]
          });
        }
      });
      let firstHalf = pieChartData.splice(0, 5);
      let secondHalf = pieChartData.splice(-5);

      // allMoods is sorted by here
      setAllMoods1(firstHalf);
      setAllMoods2(secondHalf);


    }
    createButtons();
    // console.log("[MoodsList] useEffect Run");

  }, [props]);

  const setMoodData = (e, mood) => {
    console.log(mood);
    props.setCurrentMood(mood.name);
    // props.setCurrentMood(mood);

  };

  // let buttonGroup = [];
  // for (i = 0; i < allMoods1.length; i++) {
  //   var option = allMoods1[i];
  //   var index = i;
  //   buttonGroup.push(<div className={classes.buttonContainer}>
  //     <Button onClick={(event) => { setMoodData(event, option); selectThis(); }}
  //       variant='contained' color='primary'
  //       className={classes.mar} id={index}>{option.name} - {option.value}</Button>
  //   </div>);


  // const classes = styles;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.bg}>
        {/* <ButtonGroup orientation='horizontal' color='primary' variant='outlined'>
          {allMoods.map((option, index) => (
            <Button onClick={(event) => { setMoodData(event, option); selectThis(); }} fullWidth={true} variant='outlined' color='primary' size='small' className={classes.mar} id={index}>
              {option}
            </Button>
          ))}
        </ButtonGroup> */}


        <div className={classes.flex}>
          {allMoods1.map((option, index) => (
            <div className={classes.buttonContainer}>
              <Button onClick={(event) => { setMoodData(event, option); selectThis(); }} variant='contained' color='primary' className={classes.mar} id={index}>
                {option.name} - {option.value}
              </Button>
            </div>
          ))}
        </div>

        <div className={classes.flex}>
          {allMoods2.map((option, index) => (
            <div className={classes.buttonContainer}>
              <Button onClick={(event) => { setMoodData(event, option); selectThis(); }} variant='contained' color='primary' className={classes.mar} id={index}>
                {option.name} - {option.value}
              </Button>
            </div>
          ))}
        </div>
        {/* <Box flex-wrap="wrap" className={classes.flex}>
        {allMoods1.map((option, index) => (
            <div className={classes.buttonContainer}>
              <Button onClick={(event) => { setMoodData(event, option); selectThis(); }} variant='contained' color='primary' className={classes.mar} id={index}>
                {option.name} - {option.value}
              </Button>
            </div>
          ))}
        {buttonGroup}
      </Box> */}
      </div>

      {/* <Container className={classes.root}>
        {allMoods.map((option, index) => (
          <Button onClick={(event) => setMoodData(event, option)} variant='contained' color='primary' className={classes.mar}>
            {option + ": " + moodFrequency[option]}
          </Button>
        ))}
      </Container> */}
    </ThemeProvider >
  )

}

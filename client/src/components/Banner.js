import { makeStyles, Box} from '@material-ui/core';

const useStyle = makeStyles({
    image: {
        width: '100%',
        background: `url(${'https://images.pexels.com/photos/374631/pexels-photo-374631.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'}) center/100% repeat-x #000`,
        backgroundAttachment:'fixed',
        backgroundRepeat:'no-repeat',
        height: '80vh',
        display: 'flex',
        filter: "blur(0.5px) brightness(0.8)",
        flexDirection: 'column',
        backgroundSize:'cover',
        alignItems: 'center',
        '& :first-child': {
            fontSize:80,
            marginTop:470,
            color:'#939556',
            lineHeight: 1,
transition:'0.5s',
        },
        // '& :first-child:hover' :{
        //    transition:'0.5s',
        //    transform:'scale(1.1)',
        //    color:'#000000'
          
        // },
        // '& :last-child': {
        //     width:480,
        //     fontSize: 40,
        //     marginLeft:820,
        //     marginTop:-398,
        //     color:'white',
        // }
    },
})

const Banner = () => {
    const classes = useStyle();
    return (
       <>
            <Box className={classes.image} >
              </Box></>
          
    )
}
export default Banner;
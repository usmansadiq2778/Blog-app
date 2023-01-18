import { Box, makeStyles, Typography} from '@material-ui/core';

const useStyles = makeStyles({
    banner: {
        backgroundImage: `url(${'https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg'})`,
        width: '100%',
        height: '50vh',
        backgroundPosition: 'left 0px bottom 0px',
        backgroundSize: 'cover'
    },
    wrapper: {
        padding: 20,
        '& > *': {
            marginTop: 50
        }
    },
    text: {
        color: '#28282B'
    },
    textlink: {
        color: '#28282B',
        fontSize:20
    }
})

const About = () => {
    const classes = useStyles();
    return (
        <Box>
            <Box className={classes.banner}></Box>
            <Box className={classes.wrapper}>
                <Typography variant="h3">Building a better future for writing</Typography>
                <Typography variant="h5" className={classes.text}>
                    We started Blogapp because we believe that what you read matters and that good writing is valuable.
                </Typography>
                <Typography variant="h5" className={classes.text}>
                    We believe that writers, bloggers, thinkers, and creatives of every background should be able to pursue their curiosity, generating income directly from their own audiences and on their own terms.
                </Typography>
                <Typography variant="h5" className={classes.text}>
                    When readers pay writers directly, writers can focus on doing the work they care about most. A few hundred paid subscribers can support a livelihood. A few thousand makes it lucrative.
                </Typography>
            </Box>
        </Box>
    )
}

export default About;
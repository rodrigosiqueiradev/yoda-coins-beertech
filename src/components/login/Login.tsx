import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import LoginBackground from "../../assets/login-background.svg";
import Logo from "../../assets/logo.svg";
import EFieldForm from "../../Enums/EFieldForm";
import useFetch from "../../Hooks/useFetch";
import { AUTHENTICATE } from "../../APIs/APIAuth";
import { useHistory, Link } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import Error from "../../components/error/Error";

export const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundColor: "#F3EFF5",
  },
  imageLogin: {
    backgroundColor: theme.palette.primary.light,
    backgroundImage: `url(${LoginBackground})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
  },
  overlay: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(148, 236, 190, 0.80)",
    color: "#FFFFFF",
  },
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    margin: theme.spacing(2, 2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4, 2, 4, 2),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0),
  },
  link: {
    justifyContent: "center",
  },
  boxPhrase: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: "100vh",
    margin: theme.spacing(0, 10),
    textShadow: "0.5px 0.5px 1px #000",
  },
  mainPhrase: {
    fontWeight: 500,
    textAlign: "center",
  },
  secundaryPhrase: { fontWeight: 700 },
}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory();

  const { loading, error, request } = useFetch();
  const email = useForm(EFieldForm.email);
  const password = useForm(EFieldForm.text);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if ((email.validate(), password.validate())) {
      const { url, options } = AUTHENTICATE({
        username: email.value,
        password: password.value,
      });

      const { response } = await request(url, options);
      if (response?.ok) return history.push("/");
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.imageLogin}>
        <div className={classes.overlay}>
          <div className={classes.boxPhrase}>
            <Typography
              component="h1"
              variant="h1"
              className={classes.mainPhrase}
            >
              Bem vindo!
            </Typography>
            <Typography
              component="h1"
              variant="h4"
              className={classes.mainPhrase}
            >
              Em ver você, felizes estamos nós! Para sua conta bancária tenha
              acesso
            </Typography>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} sm={8} md={5} className={classes.main}>
        <Paper className={classes.paper} elevation={6} square>
          <img src={Logo} alt="Logo Yoda - Bank" width="58" height="60" />
          <Typography component="h1" variant="h5">
            Faça seu login
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email ou Usuário"
              name="email"
              autoComplete="email"
              autoFocus
              {...email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              {...password}
            />
            <Link to="#">Esqueceu a senha?</Link>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {loading ? <CircularProgress color="secondary" /> : "ENTRAR"}
            </Button>
            <Error error={error} />
            <Grid container className={classes.link}>
              <Grid item>
                <Link to="/register">
                  {"Não tem um conta, entrar para força"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={3}>
              <Typography variant="body2" color="textSecondary" align="center">
                {"Desenvolvido para estudo no BeerTechTalents(2020) - "}
                <a
                  href="https://github.com/gss-patricia/yoda-coins-beertech"
                  target="_blank"
                >
                  Github
                </a>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}
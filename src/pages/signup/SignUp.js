import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import getAuthTheme from "../../config/theme/getAuthTheme";
import SignUpCard from "./SignUpCard";
import map from "../../assets/Images/map.png";

export default function SignUp() {
    const [mode, setMode] = React.useState("light");
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const defaultTheme = createTheme({ palette: { mode } });
    const SignUpTheme = createTheme(getAuthTheme(mode));
    // This code only runs on the client side, to determine the system color preference
    // React.useEffect(() => {
    //     // Check if there is a preferred mode in localStorage
    //     const savedMode = localStorage.getItem("themeMode");
    //     if (savedMode) {
    //         setMode("savedMode");
    //     } else {
    //         // If no preference is found, it uses system preference
    //         const systemPrefersDark = window.matchMedia(
    //             "(prefers-color-scheme: dark)"
    //         ).matches;
    //         setMode(systemPrefersDark ? "light" : "light");
    //     }
    // }, []);

    const toggleColorMode = () => {
        const newMode = mode === "dark" ? "light" : "dark";
        setMode(newMode);
        localStorage.setItem("themeMode", newMode); // Save the selected mode to localStorage
    };

    const toggleCustomTheme = () => {
        setShowCustomTheme((prev) => !prev);
    };

    return (
        <ThemeProvider theme={showCustomTheme ? SignUpTheme : defaultTheme}>
            <CssBaseline enableColorScheme />
            <Stack
                direction="column"
                component="main"
                sx={[
                    {
                        justifyContent: "space-between",
                        height: { xs: "auto", md: "100%" },
                    },
                    (theme) => ({
                        backgroundImage:
                            "radial-gradient(ellipse at 70% 51%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
                        backgroundSize: "cover",
                        ...theme.applyStyles("dark", {
                            backgroundImage:
                                "radial-gradient(at 70% 51%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
                        }),
                    }),
                ]}
            >
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        gap: { xs: 12, sm: 20 },
                        p: 2,
                        m: "auto",
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: { xs: 'auto', md: '100%' },
                            maxWidth: '300px',
                            width: '100%',
                        }}
                    >
                        <img
                            src={map}
                            alt="map"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    </Box>
                    <SignUpCard />
                </Stack>
            </Stack>
        </ThemeProvider>
    );
}
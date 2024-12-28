import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export function Loading(){
    return (
        <View style={css.container}>
            <ActivityIndicator size={60} color={"#890000"}/>
            <Text style={css.loading}>Loading...</Text>
        </View>
    )
}

const css = StyleSheet.create({
    container: {
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
        gap: 12,
    },

    loading: {
        color: "#890000",
        fontSize: 20,
    }
})
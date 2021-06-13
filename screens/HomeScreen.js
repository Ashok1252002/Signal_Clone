import React, { useLayoutEffect } from "react";
import { ScrollView } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text } from "react-native";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import CustomListItem from "../components/CustomListItem";
import { auth, db } from "../firebase";

const HomeScreen = ({ navigation }) => {
	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Signal",
			headerStyle: { backgroundColor: "#fff" },
			headerTitleStyle: { color: "black" },
			headerTintStyle: "black",
			headerLeft: () => (
				<View style={{ marginLeft: 20 }}>
					<TouchableOpacity activeOpacity={0.5}>
						<Avatar
							rounded
							source={{ uri: auth?.currentUser?.photoURL }}
						/>
					</TouchableOpacity>
				</View>
			),
		});
	}, []);

	return (
		<SafeAreaView>
			<ScrollView>
				<CustomListItem />
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({});

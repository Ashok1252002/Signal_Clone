import React, { useLayoutEffect } from "react";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { db } from "../firebase";

const AddChatScreen = ({ navigation }) => {
	const [input, setInput] = useState("");

	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Add a new Chat",
			headerBackTitle: "Chats",
		});
	}, [navigation]);

	const createChat = async () => {
		await db
			.collection("chats")
			.add({
				chatName: input,
			})
			.then(() => navigation.goBack())
			.catch((error) => alert(error.message));
	};

	return (
		<View style={styles.container}>
			<Input
				placeholder="Enter a chat name"
				value={input}
				onChangeText={(text) => setInput(text)}
				onSubmitEditing={createChat}
				leftIcon={
					<FontAwesome name="wechat" size={24} color="black" />
				}
			/>
			<Button title="Create new Chat" onPress={createChat} />
		</View>
	);
};

export default AddChatScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		padding: 30,
		height: "100%",
	},
});

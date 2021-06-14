import React, { useLayoutEffect } from "react";
import firebase from "firebase/app";
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	SafeAreaView,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Keyboard,
	TouchableWithoutFeedback,
} from "react-native";
import { Avatar } from "react-native-elements";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import { auth, db } from "../firebase";

const ChatScreen = ({ navigation, route }) => {
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([]);
	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Chat",
			headerTextAlign: "left",
			headerBackTitleVisible: false,
			headerTitle: () => (
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<Avatar
						rounded
						source={{
							uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl5CTz-fbosH6Ky_59YL9rfy_J6UVlZ6IioA&usqp=CAU",
						}}
					/>
					<Text
						style={{
							color: "white",
							marginLeft: 10,
							fontWeight: "700",
						}}
					>
						{route.params.chatName}
					</Text>
				</View>
			),
			headerLeft: () => (
				<TouchableOpacity
					style={{ marginLeft: 10 }}
					onPress={() => navigation.goBack()}
				>
					<AntDesign name="arrowleft" size={24} color="white" />
				</TouchableOpacity>
			),
			headerRight: () => (
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						marginRight: 20,
						width: 80,
					}}
				>
					<TouchableOpacity>
						<FontAwesome
							name="video-camera"
							size={24}
							color="white"
						/>
					</TouchableOpacity>
					<TouchableOpacity>
						<Ionicons name="call" size={24} color="white" />
					</TouchableOpacity>
				</View>
			),
		});
	}, [navigation]);

	const sendMessage = () => {
		Keyboard.dismiss();
		db.collection("chats")
			.doc(route.params.id)
			.collection("messages")
			.add({
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				message: input,
				displayName: auth.currentUser.displayName,
				email: auth.currentUser.email,
				photoURL: auth.currentUser.photoURL,
			});
		setInput("");
	};

	useLayoutEffect(() => {
		const unsubscribe = db
			.collection("chats")
			.doc(route.params.id)
			.collection("messages")
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshot) =>
				setMessages(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						data: doc.data(),
					})),
				),
			);
		return unsubscribe;
	}, [route]);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
			<StatusBar style="light" />
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.container}
				keyboardVerticalOffset={90}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
					<>
						<ScrollView>
							{messages.map(({ id, data }) =>
								data.email === auth.currentUser.email ? (
									<View></View>
								) : (
									<View></View>
								),
							)}
						</ScrollView>
						<View style={styles.footer}>
							<TextInput
								value={input}
								onSubmitEditing={sendMessage}
								onChangeText={(text) => setInput(text)}
								placeholder="Signal Message"
								style={styles.textInput}
							/>
							<TouchableOpacity
								activeOpacity={0.5}
								onPress={sendMessage}
							>
								<Ionicons name="send" size={24} color="#2B68E6" />
							</TouchableOpacity>
						</View>
					</>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default ChatScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	footer: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		padding: 15,
	},
	textInput: {
		bottom: 0,
		height: 40,
		flex: 1,
		marginRight: 15,
		backgroundColor: "#ECECEC",
		padding: 10,
		color: "grey",
		borderRadius: 30,
	},
});

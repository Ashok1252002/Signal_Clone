import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

const CustomListItem = ({ id, chatName, enterChat }) => {
	return (
		<ListItem>
			<Avatar
				rounded
				source={{
					uri: "https://devtalk.blender.org/uploads/default/original/2X/c/cbd0b1a6345a44b58dda0f6a355eb39ce4e8a56a.png",
				}}
			/>
			<ListItem.Content>
				<ListItem.Title style={{ fontWeight: 800 }}>
					Youtube Chat
				</ListItem.Title>
				<ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
					This is a sample subtitle This is a sample subtitle This is
					a sample subtitle This is a sample subtitle
				</ListItem.Subtitle>
			</ListItem.Content>
		</ListItem>
	);
};

export default CustomListItem;

const styles = StyleSheet.create({});

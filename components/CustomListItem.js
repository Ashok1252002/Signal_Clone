import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

const CustomListItem = ({ id, chatName, enterChat }) => {
	return (
		<ListItem
			onPress={() => enterChat(id, chatName)}
			key={id}
			bottomDivider
		>
			<Avatar
				rounded
				source={{
					uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl5CTz-fbosH6Ky_59YL9rfy_J6UVlZ6IioA&usqp=CAU",
				}}
			/>
			<ListItem.Content>
				<ListItem.Title style={{ fontWeight: 800 }}>
					{chatName}
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

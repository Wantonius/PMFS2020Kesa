import {View, FlatList, TouchableHighlight,StyleSheet,Text} from 'react-native'
import React from 'react';

export default function ContactList() {
	
	const data = [
	{
		"firstname": "Armand",
		"lastname": "Sanchez",
		"id": 1
	},
	{
		"firstname": "Dahlia",
		"lastname": "Suarez",
		"id": 2
	},
	{
		"firstname": "Kermit",
		"lastname": "Kirby",
		"id": 3
	},
	{
		"firstname": "Kato",
		"lastname": "Wheeler",
		"id": 4
	},
	{
		"firstname": "Luke",
		"lastname": "Morales",
		"id": 5
	},
	{
		"firstname": "Allen",
		"lastname": "Tillman",
		"id": 6
	},
	{
		"firstname": "Blossom",
		"lastname": "Solis",
		"id": 7
	},
	{
		"firstname": "Jerry",
		"lastname": "Dunlap",
		"id": 8
	},
	{
		"firstname": "Carter",
		"lastname": "Dejesus",
		"id": 9
	},
	{
		"firstname": "Rama",
		"lastname": "Johnson",
		"id": 10
	},
	{
		"firstname": "Meredith",
		"lastname": "Petersen",
		"id": 11
	},
	{
		"firstname": "Zena",
		"lastname": "Shepard",
		"id": 12
	},
	{
		"firstname": "Kelly",
		"lastname": "Russell",
		"id": 13
	},
	{
		"firstname": "Lucy",
		"lastname": "Wooten",
		"id": 14
	},
	{
		"firstname": "Ronan",
		"lastname": "Morris",
		"id": 15
	},
	{
		"firstname": "Gary",
		"lastname": "Holloway",
		"id": 16
	},
	{
		"firstname": "Wayne",
		"lastname": "Stark",
		"id": 17
	},
	{
		"firstname": "Randall",
		"lastname": "Espinoza",
		"id": 18
	},
	{
		"firstname": "Avram",
		"lastname": "Bray",
		"id": 19
	},
	{
		"firstname": "Preston",
		"lastname": "Bernard",
		"id": 20
	},
	{
		"firstname": "Astra",
		"lastname": "Barrett",
		"id": 21
	},
	{
		"firstname": "Bert",
		"lastname": "Beard",
		"id": 22
	},
	{
		"firstname": "Driscoll",
		"lastname": "Clemons",
		"id": 23
	},
	{
		"firstname": "Sarah",
		"lastname": "Maxwell",
		"id": 24
	},
	{
		"firstname": "Len",
		"lastname": "Mitchell",
		"id": 25
	},
	{
		"firstname": "Aurora",
		"lastname": "Mathews",
		"id": 26
	},
	{
		"firstname": "Mallory",
		"lastname": "Joseph",
		"id": 27
	},
	{
		"firstname": "Elizabeth",
		"lastname": "Massey",
		"id": 28
	},
	{
		"firstname": "Holly",
		"lastname": "Vincent",
		"id": 29
	},
	{
		"firstname": "Amanda",
		"lastname": "Sandoval",
		"id": 30
	},
	{
		"firstname": "Hanae",
		"lastname": "Bonner",
		"id": 31
	},
	{
		"firstname": "Quentin",
		"lastname": "Benson",
		"id": 32
	},
	{
		"firstname": "Miriam",
		"lastname": "Sims",
		"id": 33
	},
	{
		"firstname": "Dillon",
		"lastname": "Moon",
		"id": 34
	},
	{
		"firstname": "Gareth",
		"lastname": "Pugh",
		"id": 35
	},
	{
		"firstname": "Vaughan",
		"lastname": "Nguyen",
		"id": 36
	},
	{
		"firstname": "Ciara",
		"lastname": "Hogan",
		"id": 37
	},
	{
		"firstname": "Lance",
		"lastname": "Kirby",
		"id": 38
	},
	{
		"firstname": "Hammett",
		"lastname": "Kline",
		"id": 39
	},
	{
		"firstname": "Jack",
		"lastname": "Carpenter",
		"id": 40
	},
	{
		"firstname": "Cullen",
		"lastname": "Blair",
		"id": 41
	},
	{
		"firstname": "Colton",
		"lastname": "Estrada",
		"id": 42
	},
	{
		"firstname": "Noelle",
		"lastname": "Good",
		"id": 43
	},
	{
		"firstname": "Wynne",
		"lastname": "Alford",
		"id": 44
	},
	{
		"firstname": "Tate",
		"lastname": "Cook",
		"id": 45
	},
	{
		"firstname": "Alexa",
		"lastname": "Chaney",
		"id": 46
	},
	{
		"firstname": "Uriah",
		"lastname": "Fisher",
		"id": 47
	},
	{
		"firstname": "Barbara",
		"lastname": "Cameron",
		"id": 48
	},
	{
		"firstname": "Tanya",
		"lastname": "Bender",
		"id": 49
	},
	{
		"firstname": "Arthur",
		"lastname": "Potter",
		"id": 50
	},
	{
		"firstname": "Carlos",
		"lastname": "Holland",
		"id": 51
	},
	{
		"firstname": "Basil",
		"lastname": "Pugh",
		"id": 52
	},
	{
		"firstname": "Barrett",
		"lastname": "Dickson",
		"id": 53
	},
	{
		"firstname": "Sara",
		"lastname": "Jennings",
		"id": 54
	},
	{
		"firstname": "Ashely",
		"lastname": "Clemons",
		"id": 55
	},
	{
		"firstname": "Kylie",
		"lastname": "Kirkland",
		"id": 56
	},
	{
		"firstname": "Logan",
		"lastname": "Lang",
		"id": 57
	},
	{
		"firstname": "Arthur",
		"lastname": "Hall",
		"id": 58
	},
	{
		"firstname": "Naida",
		"lastname": "Hood",
		"id": 59
	},
	{
		"firstname": "Nerea",
		"lastname": "James",
		"id": 60
	},
	{
		"firstname": "Moses",
		"lastname": "Brewer",
		"id": 61
	},
	{
		"firstname": "Blair",
		"lastname": "Underwood",
		"id": 62
	},
	{
		"firstname": "Colt",
		"lastname": "Hester",
		"id": 63
	},
	{
		"firstname": "Maris",
		"lastname": "Jackson",
		"id": 64
	},
	{
		"firstname": "Callie",
		"lastname": "Cline",
		"id": 65
	},
	{
		"firstname": "Conan",
		"lastname": "Anthony",
		"id": 66
	},
	{
		"firstname": "Portia",
		"lastname": "Lancaster",
		"id": 67
	},
	{
		"firstname": "Vanna",
		"lastname": "Mcconnell",
		"id": 68
	},
	{
		"firstname": "Quinlan",
		"lastname": "Roberson",
		"id": 69
	},
	{
		"firstname": "Baker",
		"lastname": "Duncan",
		"id": 70
	},
	{
		"firstname": "Eagan",
		"lastname": "Lara",
		"id": 71
	},
	{
		"firstname": "Donovan",
		"lastname": "Mcmahon",
		"id": 72
	},
	{
		"firstname": "Leslie",
		"lastname": "Christian",
		"id": 73
	},
	{
		"firstname": "Warren",
		"lastname": "Bush",
		"id": 74
	},
	{
		"firstname": "Ezra",
		"lastname": "Medina",
		"id": 75
	},
	{
		"firstname": "Xantha",
		"lastname": "Santos",
		"id": 76
	},
	{
		"firstname": "Ralph",
		"lastname": "Harris",
		"id": 77
	},
	{
		"firstname": "Keaton",
		"lastname": "Sears",
		"id": 78
	},
	{
		"firstname": "Kevin",
		"lastname": "Duke",
		"id": 79
	},
	{
		"firstname": "Gannon",
		"lastname": "Frank",
		"id": 80
	},
	{
		"firstname": "Coby",
		"lastname": "Prince",
		"id": 81
	},
	{
		"firstname": "Brenden",
		"lastname": "Parsons",
		"id": 82
	},
	{
		"firstname": "Uriel",
		"lastname": "Roth",
		"id": 83
	},
	{
		"firstname": "Jemima",
		"lastname": "Pruitt",
		"id": 84
	},
	{
		"firstname": "Fay",
		"lastname": "Rhodes",
		"id": 85
	},
	{
		"firstname": "Griffith",
		"lastname": "Tyler",
		"id": 86
	},
	{
		"firstname": "Amir",
		"lastname": "Foreman",
		"id": 87
	},
	{
		"firstname": "Quynn",
		"lastname": "Bennett",
		"id": 88
	},
	{
		"firstname": "Dai",
		"lastname": "Tucker",
		"id": 89
	},
	{
		"firstname": "Rylee",
		"lastname": "Taylor",
		"id": 90
	},
	{
		"firstname": "Carter",
		"lastname": "Graves",
		"id": 91
	},
	{
		"firstname": "Chanda",
		"lastname": "Hopper",
		"id": 92
	},
	{
		"firstname": "Christopher",
		"lastname": "Goodwin",
		"id": 93
	},
	{
		"firstname": "Holly",
		"lastname": "Jarvis",
		"id": 94
	},
	{
		"firstname": "Aurelia",
		"lastname": "Sanford",
		"id": 95
	},
	{
		"firstname": "Morgan",
		"lastname": "Floyd",
		"id": 96
	},
	{
		"firstname": "Christen",
		"lastname": "Patton",
		"id": 97
	},
	{
		"firstname": "Felix",
		"lastname": "Nielsen",
		"id": 98
	},
	{
		"firstname": "Wayne",
		"lastname": "Singleton",
		"id": 99
	},
	{
		"firstname": "Stone",
		"lastname": "Kent",
		"id": 100
	}
	]
	
	const styles = StyleSheet.create({
		rowStyle: {
			flexDirection:"row",
			height:60
		},
		textStyle: {
			fontSize:18,
			color:"red"
		}
	})
	return (
		<View>
			<FlatList data={data}
					  renderItem={
						  ({item}) => {
							  return(
								<View style={styles.rowStyle}>
									<Text style={styles.textStyle}>
										Firstname:{item.firstname} Lastname:{item.lastname}
									</Text>
								</View>								
								)
						  }
					  }
					  keyExtractor={item => ""+item.id}/>
		</View>
	)
	
}
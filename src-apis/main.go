package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"golang.org/x/crypto/bcrypt"
)

type Person struct {
	ID       string `json:"id,omitempty`
	Email    string `json:"email,omitempty`
	Password string `json:"password,omitempty"`
	Notes    string `json:"notes,omitempty"`
	Token    string `json:"token,omitempty"`
}

var people []Person

// #TODO: separate handlers to files to maintain them easier.

func SaveData() {
	writeJson, _ := json.Marshal(people)
	ioutil.WriteFile("./data.json", writeJson, 0644)
}
func LoadData() {
	fileData, _ := ioutil.ReadFile("./data.json")
	json.Unmarshal(fileData, &people)
	log.Println(people)
}
func GetPersonEndpoint(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	for _, item := range people {
		if item.ID == params["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
	json.NewEncoder(w).Encode(&Person{})
}
func GetPeopleEndpoint(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(people)
}
func CreatePersonEndpoint(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var person Person
	_ = json.NewDecoder(r.Body).Decode(&person)
	person.ID = params["id"]
	people = append(people, person)
	json.NewEncoder(w).Encode(people)
	SaveData()
}
func DeletePersonEndpoint(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	for index, item := range people {
		if item.ID == params["id"] {
			people = append(people[:index], people[index+1:]...)
			break
		}
		json.NewEncoder(w).Encode(people)
	}
	SaveData()
}
func Login(w http.ResponseWriter, r *http.Request) {
	// #TODO: use Auth0 to have standard login.
	var params Person
	_ = json.NewDecoder(r.Body).Decode(&params)
	log.Println("- params: ", params)

	plainPassword := params.Password
	hash, err := bcrypt.GenerateFromPassword([]byte(plainPassword), bcrypt.DefaultCost)
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Password hash")
	log.Println(hash)
	token := ""
	// Update Token
	for index, item := range people {
		if item.Email == params.Email {

			// Comparing the password with the hash
			if err := bcrypt.CompareHashAndPassword([]byte(people[index].Password), []byte(params.Password)); err != nil {
				// Invalid Password
				// #TODO: handle error properly.
				// log.Fatal(err)
				log.Println("Invalid Password!")
			} else {
				// #TODO: use Auth0 for a real auth token.
				token = "random!@#$%^"
			}
			log.Println(index, item)
			break
		}
		// json.NewEncoder(w).Encode(people)
	}
	// SaveData()

	// Response:
	res, err := json.Marshal(token)
	if err != nil {
		panic(err)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(res)
}
func Notes(w http.ResponseWriter, r *http.Request) {
	var person Person
	_ = json.NewDecoder(r.Body).Decode(&person)
	people = append(people, person)
	SaveData()
}

func main() {
	router := mux.NewRouter()
	LoadData()

	router.HandleFunc("/people", GetPeopleEndpoint).Methods("GET")
	router.HandleFunc("/people/{id}", GetPersonEndpoint).Methods("GET")
	router.HandleFunc("/people/{id}", CreatePersonEndpoint).Methods("POST")
	router.HandleFunc("/people/{id}", DeletePersonEndpoint).Methods("DELETE")
	router.HandleFunc("/login", Login).Methods("POST", "OPTIONS")
	router.HandleFunc("/notes", Notes).Methods("POST", "OPTIONS")

	c := cors.New(cors.Options{
		AllowedMethods:     []string{"GET", "POST", "OPTIONS"},
		AllowedOrigins:     []string{"*"},
		AllowCredentials:   true,
		AllowedHeaders:     []string{"Content-Type", "Bearer", "Bearer ", "content-type", "Origin", "Accept"},
		OptionsPassthrough: true,
	})
	handler := c.Handler(router)
	log.Fatal(http.ListenAndServe(":3000", handler))
}

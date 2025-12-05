package main

import (
	"log"
	"os"

	controller "github.com/diegobbrito/MagicStream/Server/MagicStreamServer/controllers"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	router := gin.Default()

	err := godotenv.Load(".env")
	if err != nil {
		log.Println("Warning: unable to find .env file")
	}

	router.GET("/movies", controller.GetMovies())
	router.GET("/movies/:imdb_id", controller.GetMovie())
	router.POST("/movies", controller.AddMovie())

	router.POST("/register", controller.RegisterUser())
	router.POST("/login", controller.LoginUser())

	PORT := os.Getenv("PORT")
	if PORT == "" {
		PORT = "8080"
	}

	if err := router.Run(":" + PORT); err != nil {
		log.Fatal("Failed to start server", err)
	}
}

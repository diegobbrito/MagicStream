package main

import (
	"log"
	"os"

	"github.com/diegobbrito/MagicStream/Server/MagicStreamServer/database"
	"github.com/diegobbrito/MagicStream/Server/MagicStreamServer/routes"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

func main() {
	router := gin.Default()

	err := godotenv.Load(".env")
	if err != nil {
		log.Println("Warning: unable to find .env file")
	}

	PORT := os.Getenv("PORT")
	if PORT == "" {
		PORT = "8080"
	}

	var client *mongo.Client = database.Connect()

	routes.SetupUnprotectedRoutes(router, client)
	routes.SetupProtectedRoutes(router, client)

	if err := router.Run(":" + PORT); err != nil {
		log.Fatal("Failed to start server", err)
	}
}

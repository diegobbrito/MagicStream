package main

import (
	"log"
	"os"

	"github.com/diegobbrito/MagicStream/Server/MagicStreamServer/routes"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
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

	routes.SetupUnprotectedRoutes(router)
	routes.SetupProtectedRoutes(router)

	if err := router.Run(":" + PORT); err != nil {
		log.Fatal("Failed to start server", err)
	}
}

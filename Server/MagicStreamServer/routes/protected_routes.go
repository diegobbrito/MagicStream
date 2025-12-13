package routes

import (
	controller "github.com/diegobbrito/MagicStream/Server/MagicStreamServer/controllers"
	"github.com/diegobbrito/MagicStream/Server/MagicStreamServer/middleware"
	"github.com/gin-gonic/gin"
)

func SetupProtectedRoutes(router *gin.Engine) {
	router.Use(middleware.AuthMiddleware())

	router.GET("/movies/:imdb_id", controller.GetMovie())
	router.POST("/movies", controller.AddMovie())

	router.GET("/movies/recommendations", controller.GetRecommendedMovies())
}

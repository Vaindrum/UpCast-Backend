pipeline {
    agent any

    environment {
        REGISTRY = "docker.io"
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        BACKEND_IMAGE = "vaindrum/upcast-backend"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Vaindrum/UpCast-Backend'
            }
        }

        stage('Build Backend Image') {
            steps {
                sh "docker build -t $BACKEND_IMAGE:latest ."
            }
        }

        stage('Login & Push') {
            steps {
                sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
                sh "docker push $BACKEND_IMAGE:latest"
            }
        }
    }
}

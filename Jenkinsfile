pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = "omwarkri123"
        IMAGE_NAME = "react-app"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/omwarkri/react-code.git'
            }
        }

        stage('Build React App & Docker Image') {
            steps {
                script {
                    sh "docker build -t ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest ."
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'dockerhub-pass', variable: 'DOCKERHUB_PASS')]) {
                        sh "echo ${DOCKERHUB_PASS} | docker login -u ${DOCKERHUB_USERNAME} --password-stdin"
                    }
                }
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                script {
                    sh "docker push ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest"
                }
            }
        }

        stage('Run Container') {
            steps {
                script {
                    // stop old container if exists
                    sh 'docker stop react-container || true'
                    sh 'docker rm react-container || true'

                    // run new container
                    sh "docker run -d --name react-container -p 80:80 ${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest"
                }
            }
        }
    }
}

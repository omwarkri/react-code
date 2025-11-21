https://github.com/omwarkri/react-code.gitpipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = "omwarkri123"
        IMAGE_NAME = "react-app"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/omwarkri/react-code.git'
            }
        }

        stage('Build React App & Docker Image') {
            steps {
                script {
                    sh 'docker build -t $omwarkri123/$react-app:latest .'
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {

 sh "echo $Radhakrushn@123 | docker login -u $omwarkri123 --password-stdin"
                }
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                script {
                    sh 'docker push $omwarkri123/$react-app:latest'
                }
            }
        }

        stage('Run Container') {
            steps {
                script {
                    // Stop old container if exists
                    sh 'docker stop react-container || true'
                    sh 'docker rm react-container || true'

                    // Run new container
                    sh 'docker run -d --name react-container -p 80:80 $omwarkri123/$react-app:latest'
                }
            }
        }
     }
  }

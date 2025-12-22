pipeline {
    agent any

    environment {
        IMAGE_NAME = "my-react-app"
        DOCKERHUB_USER = "omwarkri123"
        IMAGE_TAG = "v2"
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Tag Image') {
            steps {
                sh 'docker tag $IMAGE_NAME $DOCKERHUB_USER/$IMAGE_NAME:$IMAGE_TAG'
            }
        }

        stage('Push Image to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                    docker push $DOCKERHUB_USER/$IMAGE_NAME:$IMAGE_TAG
                    '''
                }
            }
        }
    }
}

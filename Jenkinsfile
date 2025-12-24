pipeline {
    agent any

    environment {
        IMAGE_NAME = "my-react-app"
        DOCKERHUB_USER = "omwarkri123"
        IMAGE_TAG = "${BUILD_NUMBER}"
        K8S_NAMESPACE = "react-prod"
        DEPLOYMENT_NAME = "react-app"
        CONTAINER_NAME = "react-app"
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('DockerHub Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-token1',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                docker build -t $IMAGE_NAME .
                docker tag $IMAGE_NAME $DOCKERHUB_USER/$IMAGE_NAME:$IMAGE_TAG
                '''
            }
        }

        stage('Push Image to DockerHub') {
            steps {
                sh 'docker push $DOCKERHUB_USER/$IMAGE_NAME:$IMAGE_TAG'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh """
                kubectl set image deployment/$DEPLOYMENT_NAME \
                $CONTAINER_NAME=$DOCKERHUB_USER/$IMAGE_NAME:$IMAGE_TAG \
                -n $K8S_NAMESPACE

                kubectl rollout status deployment/$DEPLOYMENT_NAME -n $K8S_NAMESPACE
                """
            }
        }
    }
}

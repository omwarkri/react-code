pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/omwarkri/react-code.git'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t react-docker-app:1.0 .'
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    sh '''
                        docker rm -f react-app || true
                        docker run -d --name react-app -p 3000:80 react-docker-app:1.0
                    '''
                }
            }
        }
    }
}

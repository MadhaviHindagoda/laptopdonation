pipeline {
    agent any

    environment {
        laptop-backend = 'backend'
        laptop-frontend = 'frontend'
        DOCKER_CREDENTIALS_ID = 'madhavih'
        GIT_CREDENTIALS_ID = 'PATToken'  // Update with your new credential ID
        GIT_REPO = 'https://github.com/MadhaviHindagoda/laptopdonation.git'
    }

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    git url: env.GIT_REPO, credentialsId: env.GIT_CREDENTIALS_ID, branch: 'main'
                }
            }
        }
        // Add other stages as needed
        stage('Build Frontend Docker Image') {
            steps {
                script {
                    docker.build("${env.laptop-frontend}", 'frontend')
                }
            }
        }
        stage('Build Backend Docker Image') {
            steps {
                script {
                    docker.build("${env.laptop-backend}", 'backend')
                }
            }
        }
        stage('Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('', env.DOCKER_CREDENTIALS_ID) {
                        docker.image("${env.docker-backend}").push()
                        docker.image("${env.docker-frontend}").push()
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker-compose down'
                        sh 'docker-compose up -d'
                    } else {
                        bat 'docker-compose down'
                        bat 'docker-compose up -d'
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}

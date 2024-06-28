pipeline {
    agent any

    environment {
        DOCKER_IMAGE_BACKEND = 'your-dockerhub-username/mern-backend'
        DOCKER_IMAGE_FRONTEND = 'your-dockerhub-username/mern-frontend'
        DOCKER_CREDENTIALS_ID = 'your-docker-credentials-id'
        GIT_REPO = 'https://github.com/MadhaviHindagoda/laptopdonation.git'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git url: env.GIT_REPO, branch: 'main'
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                script {
                    docker.build("${env.DOCKER_IMAGE_FRONTEND}", 'frontend')
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                script {
                    docker.build("${env.DOCKER_IMAGE_BACKEND}", 'backend')
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('', env.DOCKER_CREDENTIALS_ID) {
                        docker.image("${env.DOCKER_IMAGE_BACKEND}").push()
                        docker.image("${env.DOCKER_IMAGE_FRONTEND}").push()
                    }
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

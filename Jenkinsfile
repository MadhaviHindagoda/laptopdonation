pipeline {
    agent any

    environment {
        laptop_backend = 'backend'
        laptop_frontend = 'frontend'
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
        
        stage('Build Frontend Docker Image') {
            steps {
                script {
                    docker.build("${env.laptop_frontend}", '.')  // Assuming Dockerfile is in the root
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                script {
                    docker.build("${env.laptop_backend}", '.')  // Assuming Dockerfile is in the root
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', env.DOCKER_CREDENTIALS_ID) {
                        docker.image("${env.laptop_backend}").push()
                        docker.image("${env.laptop_frontend}").push()
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

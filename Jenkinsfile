pipeline {
    agent any
    
    triggers { 
        pollSCM('H/5 * * * *') 
    }
    
    environment {
        IMAGE_SERVER = 'hamrouniraed07/mern-server'  
        IMAGE_CLIENT = 'hamrouniraed07/mern-client'  
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'git@github.com:hamrouniraed07/Devops_Tp.git',  
                    credentialsId: 'gitlab_ssh'
            }
        }
        
        stage('Build + Push SERVER') {
            when { 
                changeset 'server/**' 
            }
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'DH_USER',
                    passwordVariable: 'DH_PASS'
                )]) {
                    sh '''
                        echo "$DH_PASS" | docker login -u "$DH_USER" --password-stdin
                        docker build -t $IMAGE_SERVER:${BUILD_NUMBER} server
                        docker push $IMAGE_SERVER:${BUILD_NUMBER}
                    '''
                }
            }
        }
        
        stage('Build + Push CLIENT') {
            when { 
                changeset 'client/**' 
            }
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'DH_USER',
                    passwordVariable: 'DH_PASS'
                )]) {
                    sh '''
                        echo "$DH_PASS" | docker login -u "$DH_USER" --password-stdin
                        docker build -t $IMAGE_CLIENT:${BUILD_NUMBER} client
                        docker push $IMAGE_CLIENT:${BUILD_NUMBER}
                    '''
                }
            }
        }
        
        stage('Scan SERVER with Trivy') {
            when { 
                changeset 'server/**' 
            }
            steps {
                script {
                    sh '''
                        echo "=== Scanning SERVER image with Trivy ==="
                        docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
                            aquasec/trivy image --format table --severity CRITICAL,HIGH,MEDIUM \
                            $IMAGE_SERVER:${BUILD_NUMBER} | tee trivy_server_report.txt
                        
                        echo ""
                        echo "=== Trivy Scan Summary for SERVER ==="
                        grep -E "Total:|CRITICAL|HIGH|MEDIUM" trivy_server_report.txt || echo "Aucune vulnérabilité majeure détectée"
                    '''
                }
                archiveArtifacts artifacts: 'trivy_server_report.txt', allowEmptyArchive: true
            }
        }
        
        stage('Scan CLIENT with Trivy') {
            when { 
                changeset 'client/**' 
            }
            steps {
                script {
                    sh '''
                        echo "=== Scanning CLIENT image with Trivy ==="
                        docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
                            aquasec/trivy image --format table --severity CRITICAL,HIGH,MEDIUM \
                            $IMAGE_CLIENT:${BUILD_NUMBER} | tee trivy_client_report.txt
                        
                        echo ""
                        echo "=== Trivy Scan Summary for CLIENT ==="
                        grep -E "Total:|CRITICAL|HIGH|MEDIUM" trivy_client_report.txt || echo "Aucune vulnérabilité majeure détectée"
                    '''
                }
                archiveArtifacts artifacts: 'trivy_client_report.txt', allowEmptyArchive: true
            }
        }
    }
    
    post {
        always {
            sh 'docker system prune -af || true'
        }
    }
}
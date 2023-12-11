pipeline {
    agent any
    tools { nodejs "Node16" }
    stages {
        stage('Install deps') {
            steps {
                sh 'npm install'
            }
        }
        stage('Deploy') {
            when {
                anyOf {
                    branch 'master'
                }
            }
            steps {
                sshagent(['ci-user-ssh']) {
                    sh 'scp -r -o StrictHostKeyChecking=no ./build/* easytourney@easy-tourney.mgm-edv.de:/var/www/html'
                }
            }
        }
    }
}
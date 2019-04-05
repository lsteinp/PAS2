node {

    currentBuild.result = "SUCCESS"

    try {

        stage('Delete Repo hubble'){
            sh 'ssh root@10.32.223.4 -p 5439 "rm -rf /opt/docker/Hublle/API"'
            sh 'ssh root@10.32.223.4 -p 5439 "rm -rf /opt/docker/Hublle/front"'
        }

        stage('Clone Repos Paisagem Front e Bach'){
           sh 'ssh root@10.32.223.4 -p 5439 "git clone --depth 1 --branch homo http://projetos@www.tools.ages.pucrs.br/Hublle/API.git /opt/docker/Hublle/API"'
           sh 'ssh root@10.32.223.4 -p 5439 "git clone --depth 1 --branch homo http://projetos@www.tools.ages.pucrs.br/Hublle/front.git /opt/docker/Hublle/front"'
        }

        stage('Install and Build Paisagem Front Angular'){
            sh 'ssh root@10.32.223.4 -p 5439 "/opt/docker/paisagem/ic.sh"'
        }

        stage('Down Images DB, Api and Web'){
           sh 'ssh root@10.32.223.4 -p 5439 "cd /opt/docker/Hublle/API; docker-compose down; docker-compose -f docker-compose-web.yml down"'
        }

        stage('Build and Up Docker Image Api'){
           sh 'ssh root@10.32.223.4 -p 5439 "cd /opt/docker/Hublle/API; docker-compose up --build -d"'
        }

        stage('Build and Up Docker Image Web'){
           sh 'ssh root@10.32.223.4 -p 5439 "cd /opt/docker/Hublle/API; docker-compose -f docker-compose-web.yml up --build -d"'
        }

        stage('Success'){
            mail body: 'project build successful in HML',
                     from: 'jenkins@ages.com',
                     replyTo: 'cassio.trindade@pucrs.br',
                     subject: 'Success CI Paissagem',
                     to: 'cassio.trindade@pucrs.br'
        }

    }
    catch (err) {

        currentBuild.result = "FAILURE"

            mail body: "project build error is here: ${env.BUILD_URL}" ,
            from: 'jenkins@ages.com',
            replyTo: 'cassio.trindade@pucrs.br',
            subject: 'Error CI Paisagem',
            to: 'cassio.trindade@pucrs.br'

        throw err
    }

}


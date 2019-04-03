node {

    currentBuild.result = "SUCCESS"

    try {

        stage('Delete Repo Paisagem'){
            sh 'ssh root@10.32.223.4 -p 5439 "rm -rf /opt/docker/paisagem/api"'
            sh 'ssh root@10.32.223.4 -p 5439 "rm -rf /opt/docker/paisagem/web"'
        }

        stage('Clone Repos Paisagem Front e Bach'){
           sh 'ssh root@10.32.223.4 -p 5439 "git clone --depth 1 --branch homo http://projetos@www.tools.ages.pucrs.br/paisagem/api.git /opt/docker/paisagem/api"'
           sh 'ssh root@10.32.223.4 -p 5439 "git clone --depth 1 --branch homo http://projetos@www.tools.ages.pucrs.br/paisagem/web.git /opt/docker/paisagem/web"'
        }

        stage('Install and Build Paisagem Front Angular'){
            sh 'ssh root@10.32.223.4 -p 5439 "/opt/docker/paisagem/ic.sh"'
        }

        stage('Down Images DB, Api and Web'){
           sh 'ssh root@10.32.223.4 -p 5439 "cd /opt/docker/paisagem/api; docker-compose down; docker-compose -f docker-compose-web.yml down"'
        }

        stage('Build and Up Docker Image Api'){
           sh 'ssh root@10.32.223.4 -p 5439 "cd /opt/docker/paisagem/api; docker-compose up --build -d"'
        }

        stage('Build and Up Docker Image Web'){
           sh 'ssh root@10.32.223.4 -p 5439 "cd /opt/docker/paisagem/api; docker-compose -f docker-compose-web.yml up --build -d"'
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


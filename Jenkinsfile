node {

    currentBuild.result = "SUCCESS"

    try {

        stage('Delete Repo Hubble'){
            sh 'ssh root@10.32.223.4 -p 5439 "rm -rf /opt/docker/hubble/api"'
            sh 'ssh root@10.32.223.4 -p 5439 "rm -rf /opt/docker/hubble/web"'
        }

        stage('Clone Repos Hubble Front e Back'){
           sh 'ssh root@10.32.223.4 -p 5439 "git clone --depth 1 --branch hml http://www.tools.ages.pucrs.br/Hublle/API.git /opt/docker/hubble/api"'
           sh 'ssh root@10.32.223.4 -p 5439 "git clone --depth 1 --branch hml http://www.tools.ages.pucrs.br/Hublle/Front-angular.git /opt/docker/hubble/web"'
        }

        stage('Install and Build Hubble Front Angular'){
            sh 'ssh root@10.32.223.4 -p 5439 "nvm use 10.15.3; cd /opt/docker/hubble/web; npm install; ng build --configuration=hml"'
        }

        stage('Move web directory to API'){
            sh 'ssh root@10.32.223.4 -p 5439 "mv -f /opt/docker/hubble/web/dist /opt/docker/hubble/api/"'
        }

        stage('Down Images DB, Api and Web'){
           sh 'ssh root@10.32.223.4 -p 5439 "cd /opt/docker/hubble/api; docker-compose down --remove-orphans; docker-compose -f docker-compose.yml down --remove-orphans"'
        }

        stage('Build and Up Docker Image Api'){
           sh 'ssh root@10.32.223.4 -p 5439 "cd /opt/docker/hubble/api; docker-compose up --build -d"'
        }

        stage('Build and Up Docker Image Web'){
           sh 'ssh root@10.32.223.4 -p 5439 "cd /opt/docker/hubble/api; docker-compose -f docker-compose-web.yml up --build -d"'
        }

        stage('Success'){
            mail body: 'project build successful in HML',
                     from: 'jenkins@ages.com',
                     replyTo: 'ramon.correa@acad.pucrs.br',
                     subject: 'Success CI Hubble',
                     to: 'ramon.correa@acad.pucrs.br'
        }

    }
    catch (err) {

        currentBuild.result = "FAILURE"

            mail body: "project build error is here: ${env.BUILD_URL}" ,
            from: 'jenkins@ages.com',
            replyTo: 'ramon.correa@acad.pucrs.br',
            subject: 'Error CI Hubble',
            to: 'ramon.correa@acad.pucrs.br'

        throw err
    }

}

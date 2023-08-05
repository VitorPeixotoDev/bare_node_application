//external modules 
const inquirer = require('inquirer')
const chalk = require('chalk')


//core modules
const fs = require('fs')


const operation = () => {
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: [
            'Criar Conta',
            'Consultar Saldo',
            'Depositar',
            'Sacar',
            'Sair'
        ],
    }])
    .then(answer => {
        const action = answer['action']

        switch(action){
            case 'Criar Conta':
                createAnAccount()
                break
            case 'Depositar':
                deposit()
                break
            case 'Cosultar Saldo':
                break
            case 'Sacar':
                break
            case 'Sair':
                console.log(chalk.bgBlue.black('Obrigado por usar o Account!'))
                process.exit()
                break
            default:
                console.log('Por favor reinicie a operação.')
        }
    })
    .catch(err => console.log(err))
}
operation()

// create an account
const createAnAccount = () => {
    console.log(chalk.bgGreen.black('Obrigado por escolher o Account!'))
    console.log(chalk.green('Por favor defina as opções da sua conta:'))

    buildAccount()
}

const buildAccount = () => {
    inquirer.prompt([{
        name: 'accountName',
        message: 'Digite um nome de acesso para sua conta:'
    }])
    .then(answer => {
        const accountName = answer['accountName']

        console.info(accountName)

        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')
        }

        if(fs.existsSync(`accounts/${accountName}.json`)){
            console.log(chalk.bgRed.black('Essa conta já existe. Escolha outro nome.'))
            buildAccount()
            return
        }
        
        fs.writeFileSync(
            `accounts/${accountName}.json`, 
            '{"balance": 0}',
            err => console.log(err)
        )

        console.log(chalk.green(`Parabéns ${accountName}, sua conta foi criada com sucesso!`))
        operation()
    })
    .catch(err => console.log(err))
}

// add an amount yo user account
const deposit = () => {
    inquirer.prompt([{
        name: 'accountName',
        message: 'Qual o nome da sua conta?'
    }])
    .then(answer => {
        const accountName = answer['accountName']
        if(!checkAccount(accountName)){
            return deposit()
        }
    })
    .catch(err => console.log(err))
}

const checkAccount = accountName => {
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.log(chalk.bgRed.black('Essa conta não existe. Certifique-se de que está usando o nome correto.'))
        return false
    }

    return true
}


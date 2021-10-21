document.addEventListener("DOMContentLoaded", () => {


    // modal 

    const trigger  = document.querySelector('.go__click_btn'),
          overlay  = document.querySelector('.overlay'),
          popup    = document.querySelector('.popup'),
          closeBtn = popup.querySelector('.btn-close');


    trigger.addEventListener('click', e => {
        e.preventDefault();
        document.body.style.overflow = 'hidden';
        overlay.classList.add('fade');
        overlay.style.display = 'block';
        popup.classList.add('fade');
        popup.style.display = 'block';
        closeBtn.addEventListener('click', () => {
            document.body.style.overflow = '';
            overlay.classList.remove('fade');
            overlay.style.display = 'none';
            popup.classList.remove('fade');
            popup.style.display = 'none';
        });
        overlay.addEventListener('click', () => {
            document.body.style.overflow = '';
            overlay.classList.remove('fade');
            overlay.style.display = 'none';
            popup.classList.remove('fade');
            popup.style.display = 'none';
        });

    });

    //mask

    const mask = (selector) => {

        let setCursorPosition = (pos, elem) => {
            elem.focus();
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.crateTextRange) {
                let range = elem.crateTextRange();

                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        };

        function createMask(event) {
            let matrix = '+7 (___) ___ __ __',
                i = 0,
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, '');
            if (def.length >= val.length) {
                val = def;
            }

            this.value = matrix.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });

            if (event.type === 'blur') {
                if (this.value.length == 2) {
                    this.value = '';
                }
            } else {
                setCursorPosition(this.value.length, this);
            }
        }

        let inputs = document.querySelectorAll(selector);

        inputs.forEach(input => {
            input.addEventListener('input', createMask); 
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
        });
    }
    mask('input#user__tel');

    //form
    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: "POST",
            body: data
        });
        return await res.text();
    };
    
    const getResource = async (url) => {
        let res = await fetch(url);
        if(!res.ok) {
            throw new Error(`Cloud not fetch ${url}, status: ${res.status}` );
        }
        return await res.json();
    };


    const forms = (state) => {
        const form = document.querySelectorAll('form'),
                inputs = document.querySelectorAll('input'),
                selects = document.querySelectorAll('select'),
                upload = document.querySelectorAll('[name=upload]');

        // checkNumInputs('input[name="user_phone"]');
        
        const messege = {
            loading: 'Загрузка...',
            success: 'Спасибо. Скоро с Вами свяжутся',
            failure: 'Что-то пошло не так',
            spinner: 'icons/spinner.gif',
            ok: 'icons/ok.png',
            fail: 'icons/fail.png'
        };

        const path = {
            designer: 'mailer/smart.php',
        };



        const clearInputs = () => {
            inputs.forEach(item => {
                item.value = '';
            });

            selects.forEach(item => {
                if (item.id === 'options') {
                    item.value = '0';
                } else {
                    item.value = '';
                }
            });

            upload.forEach(item => {
                item.previousElementSibling.textContent = 'Файл не выбран';
            });
        };

        upload.forEach(item => {
            item.addEventListener('input', () => {
                console.log(item.files[0]);
                let dots;
                const arr = item.files[0].name.split('.');
                arr[0].length > 6 ? dots = "..." : dots = ".";
                const name = arr[0].substring(0, 6) + dots + arr[1];
                
                item.previousElementSibling.textContent = name;
            });
        });

        form.forEach(item => {
            item.addEventListener('submit', (e) => {
                e.preventDefault();
                
                let statusMessege = document.createElement('div');
                statusMessege.classList.add('status');            
                item.parentNode.appendChild(statusMessege);

                item.classList.add('animated', 'fadeOutUp');
                setTimeout(() => {
                    item.style.display = 'none';
                }, 400);

                let statusImg = document.createElement('img');
                statusImg.setAttribute('src', messege.spinner);
                statusImg.classList.add('animated', 'fadeInUp');
                statusMessege.appendChild(statusImg);

                let textMessege = document.createElement('div');
                textMessege.textContent = messege.loading;
                statusMessege.appendChild(textMessege);

                let formData = new FormData(item);
                let api;

                api = path.designer;

                if (item.classList.contains('calc_form')) {
                    for (let key in state) {
                        formData.append(key, state[key]);
                    } 
                }
                
                postData(api, formData)
                    .then(res => {
                        console.log(res);
                        statusImg.setAttribute('src', messege.ok);
                        textMessege.textContent = messege.success;
                    })
                    .catch(res => {
                        console.log(res);
                        statusImg.setAttribute('src', messege.fail);
                        textMessege.textContent = messege.failure;
                    })
                    .finally(() => {
                        clearInputs();
                        setTimeout(() => {
                            statusMessege.remove();
                            item.style.display = 'block';
                            item.classList.remove('fadeOutUp');
                            item.classList.add('fadeInUp');
                        }, 5000);
                    });
            });
        });
    };
    
    forms('.popup__form');



});
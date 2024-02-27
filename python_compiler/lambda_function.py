
import sys
import subprocess
import io

def excecute_python(code):
    print("got the request")
    original_stdout=sys.stdout
    sys.stdout=output_capture=io.StringIO()
    try:
        exec(code)
        output=output_capture.getvalue()
        print('out odf the code',output)
        return output
    except Exception as e:
        return str(e)
    finally:
        sys.stdout = original_stdout

        
def handler(event,context):     
    print("hello world")
    language=event.get('language','python')
    code=event.get('code','')
    if language == 'python':
        result=excecute_python(code)
    else:
        result='unsupported code'
    return {
        'statusCode':200,
        'body':result
    }


# import sys
# import subprocess
# import io

# def execute_python(code, input_data):
#     original_stdin = sys.stdin
#     sys.stdin = io.StringIO(input_data)
#     original_stdout = sys.stdout
#     sys.stdout = output_capture = io.StringIO()
#     try:
#         exec(code)
#         output = output_capture.getvalue()
#         return output
#     except Exception as e:
#         return str(e)
#     finally:
#         sys.stdin = original_stdin
#         sys.stdout = original_stdout

# def handler(event, context):
#     language = event.get('language', 'python')
#     code = event.get('code', '')
#     input_data = event.get('input', '')  # Assuming input is provided as a string
#     if language == 'python':
#         result = execute_python(code, input_data)
#     else:
#         result = 'unsupported code'
#     return {
#         'statusCode': 200,
#         'body': result
#     }


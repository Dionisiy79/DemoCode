@REM ���� ��࠭�� � ����஢�� DOS-866. (���� �������� � ��������� DOS-866).
@REM ��������� REM �������� �������਩ �� ���� ��ப�. ������ @ �⪫�砥� ����� �⮩ ��ப� � ���᮫� �� ����祭��� ०��� "echo on".

@echo off & REM �⪫�祭�� ०��� ������ �ᯮ��塞�� ������� � ���᮫�. ������ & ᮥ����� � ����� ��ப� ��᪮�쪮 ������� �ਯ�, ����� �� 㬮�砭�� �ਭ�� ����� � �⤥���� ��ப��. �� ⠪�� ��ꥤ�������� �������� ������� ����� ������. ����ୠ⨢�� ᨭ⠪�� �뤥����� ����� - �������� �������� � ��㣫� ᪮���.

goto :mimimi & REM ���室 � ���������� ��⪥ � ���� (��� ��⪨ ��稭����� � �������)
    ��� �ந������ ⥪��. �.�. � ��ப�� ����� ������� �� ���� �믮����� ����� ������� ���������� �������਩.
    �� 㤮���� ��� ��� �ᯮ�짮���� ��� �⪫�祭�� �६���� ���㦭�� ���⪮� ����. ����� ��� ����祭�� �����筮 ���������஢��� ��ப� ��砫��� ��ப� goto
    goto :eof & REM ���室 � ����� �ਯ� 
    REM ����� ���譥�� �ਯ�
    call mimimi2.bat  & REM � ��������� �믮������
    start mimimi2.bat & REM �ᨭ�஭��
    REM ����� ���譥�� �ਯ� ����� ����� � ⥪�騩 �ਯ� ��᫥ ��⪨ � ��뢠�� ⠪�� ��ப��:
    exit &    REM ������ �����襭�� ࠡ��� �������� ������� CMD.EXE
    exit /b & REM �����襭�� ࠡ��� ⥪�饣� �ਯ� � �����⮬ � ���, �� ���ன �ਯ� �� �맢��.
:mimimi

REM �뢮� ⥪�� � ���᮫�
<Nul set /P $V=Hello world! & REM ��� ��७�� ��ப� (����� ������! �� ��࠭ �뢮����� ᮮ�饭�� 类�� �।�����饥 ���짮��⥫� ����� �����, �� �������� <nul �� �室 �������� ���⮩ ����� ������. � �⮣� ᮮ�饭�� ��⠥��� �� ��࠭� ��� ��७�� ��ப�.)
echo Hello world!           & REM � ��७�ᮬ ��ப� (������� echo �뢮��� �� ��࠭ ࠧ��饭��� ��᫥ ��� ᮮ�饭��)

goto :contin

REM ��७��ࠢ����� �뢮�� 
echo Hello world! > tempfile.txt  & REM � 䠩� � ��१������ 䠩��
echo Hello world! >> tempfile.txt & REM � 䠩� � ������� � ����� 䠩��
echo Hello world! > nul           & REM � ���⮩ ��⮪ (�᫨ ���� ���� ����� �뢮� � ��࠭� ���᮫�)


REM ���� � ࠡ�� �ணࠬ��
ping 127.0.0.1 -n 3 > nul    & REM ��㧠 �믮������ �� 3 ᥪ㭤� (�������! ����� �⨫��� ���������� �ࢥ� �� ࠧ� - ��� �믮������ 1 ᥪ㭤�. )
pause                   & REM ��㧠 �믮������ �� ������ �� ������   
set /P $V=������ ENTER & REM ��㧠 �믮������ �� ������ ������ Enter (��ਯ� 䠪��᪨ ������� ����� ⥪�⮢�� ��ப� �⮡� ��࠭��� �� � ��६����� $V)

:contin

    REM **********************
    REM  ������ � �����������  
    REM **********************
   
REM ���樠������ ��६�����
set VARSTR=Hello & REM �� ��६���� ��࠭����� ��� ��ப� ����� � �஡����� �� ����� "=" �� ��७�� ��ப�. 
set VARSTR=Hello2 & REM �ந��樠����஢����� ��६����� ����� ��१������ ���� ���祭���
REM ���ᨬ���� ࠧ��� ��६����� ����� � ���������: 8192 ����. ���ᨬ���� ��騩 ࠧ��� ��� ��६����� �।�, ������ ����� ��६����� � ���� ࠢ���⢠, ��⠢��� 65536 �����.

if defined VARSTR echo ��६����� ������� & REM �஢�ઠ ���樠����஢��� �� ��६�����
set NUMB2 = %NUMB1% & REM ��� ����⠭���� ���祭�� ��६����� �� �㦭� ��ࠬ���� � ���� ��஭ ᨬ������ % %
echo � ��६����� VARSTR �࠭���� ���祭�� %VARSTR% & REM �뢮� ���祭�� ��६����� �� ��࠭

REM ��䬥��᪨� ����樨 (ࠡ���� ⮫쪮 � 楫묨 32-���묨 �᫠�� � ������)
set /a NUMB1 = (7 + 2 - 3) * 4 & REM ��ࠬ��� /a 㪠�뢠�� �� ��ப� �㦭� ���ਭ����� ��� ��䬥��᪮� ��ࠦ����. ������� ����� ���� ⮫쪮 楫� �᫮� � ������ ࠧ�來����� 32 ���. �஡��� ����������� ���⮬� �� ����� �ᯮ�짮���� ��� �ଠ�஢����.
set /a NUMB1 = 4 + 2 , NUMB2 = 7 - 9 , NUMB3 = 5 * 8 & REM 
set /a NUMB1 = 9 / 5 & REM ������� ࠢ�� 1, ��᪮��� ������� ⮫쪮 楫�� ���� �� �������, � ���⮪ ����뢠����. � �ਯ�� ����㯭� ⮫쪮 楫��᫥���� �������.
set /a NUMB1 = 31 %% 8 & REM ���⮪ �� �������.
REM 

REM ����� ��䬥��᪨� �������
set /a NUMB2 = !NUMB1 & REM ������ �����᪮�� "��". ������� 1, �᫨ NUMB1 ࠢ�� 0, � ������� 1 � ��㣮� ��砥. 
set /a NUMB2 = -NUMB1 & REM ���⠭�� �� 0. �.�. ᬥ�� �����.
set /a NUMB2 = ~NUMB1 & REM ����⮢�� ������� - ���⠭�� �� -1. �.�. ᬥ�� ����� � �����६���� ���६���. ������� � �離� � ����樥� ᬥ�� �����
set /a NUMB2 = -~NUMB1 & REM ���६���
set /a NUMB2 = ~-NUMB1 & REM ���६���

REM �������஢���� �������
set /a NUMB1 += 9 & REM �����祭�� ���祭�� �� 㪠������ �᫮. ���������⭮ NUMB1 = %NUBM1% + 9. 
REM ��������� ��ࠧ�� ����㯭� ����樨 -= *= /= %=


REM ��⮢� ��䬥��᪨� ����樨
set /a NUMB2 = NUMB1 ">>" 1 & REM ������ ᤢ�� ��ࠢ� �� 㪠������ �᫮ ��⮢ (䠪��᪨ ������� �� 2 � �⥯��� 㪠������� �᫠). ������ ������ � ������� ����窠�. ��� ����⥫��� �ᥫ ���� ��࠭���� � ����� ���� (�᫮ 11___110 = -2 ᤢ������� � �᫮ 11___111 = -1 � �.�.)  
set /a NUMB2 = NUMB1 "<<" 1 & REM ������ ᤢ�� ����� (䠪��᪨ 㬭������ �� 2 � �⥯��� 㪠������� �᫠)
set /a NUMB2 = NUMB1 "&" NUMB2 & REM ����⮢�� � (AND). �ᯮ������ ��� ��⠭���� � �㦭� ���� ���祭�� 0.
set /a NUMB2 = NUMB1 "|" NUMB2 & REM ����⮢�� ��� (OR). �ᯮ������ ��� ��⠭���� � �㦭� ���� ���祭�� 1. 
set /a NUMB2 = NUMB1 "^" NUMB2 & REM ����⮢�� �᪫���饥 ��� (XOR). �ᯮ������ ��� ᬥ�� ���祭�� �㦭�� ��⮢ �� ��⨢��������.

REM ������� �ࠢ����� � �����᪨� ������� �।�ᬮ�७� ⮫쪮 � ������ �᫮����� �믮������ ������ IF
if Str1==Str1 set RESULT=yes           & REM �����᪨� ������ ࠢ���⢠ ==
if Str1 EQU Str1 set RESULT=equal      & REM ����ୠ⨢�� ��ਠ�� ࠢ���⢠ EQU
if Str1 NEQ Str2 set RESULT=not equal  & REM �����᪨� ������ ��ࠢ���⢠ NEQ
if 5 LSS 7 set RESULT=smaller          & REM ����� LSS
if 5 LEQ 7 set RESULT=smaller or equal & REM ����� ��� ࠢ�� LEQ
if 9 GTR 7 set RESULT=bigger           & REM ����� - GTR
if 9 GEQ 7 set RESULT=bigger or equal  & REM ����� ��� ࠢ�� - GEQ
if not Str1==Str2 set RESULT=yes       & REM �����᪨� ������ ���栭�� NOT
REM �����᪨� �����஢ � � ��� (����樨 � ����樨 �� �।�ᬮ�७�). �� ����� ॠ�������� � ������� ���室�� �� ��⪠� ��� �१ �������� �������⥫��� ��६�����.

REM �ᯮ�짮����� ��६�����
echo � ��६����� NUMB1 �࠭���� ���祭�� %NUMB1% & REM ��� ����⠭���� ���祭�� ��६����� �� �㦭� ��ࠬ���� c ���� ��஭ ᨬ������ % %
set /a NUMB1 = %NUMB1% + 5 & REM ��� ��᢮���� ������ ���祭�� ����� �ᯮ�짮���� ��� �� ��६�����, ���� � ��� �࠭���� ��஥ ���祭��.
set /a NUMB2 = NUMB1 + 5 & REM �� ���᫥��� �᫮��� ���祭�� ��६���� ����� �ᯮ�짮���� ��� ��ࠬ����� ������ %%. � ����� ����� ��ப���� ���祭�� ��६����� �㤥� �८�ࠧ��뢠���� � 楫�� �᫮.

REM �������� ������ �������� ��६�����
set V1=������쭮� ���祭��
setlocal & REM ������� setlocal � endlocal ������ ������� ���� � ���ன �� ��������� ��६����� ���� ������묨 ��� �⮩ ������
    set V1=�����쭮� ���祭��
    echo ����� �����쭮� ������ V1 = %V1% & REM ��� ����砥� �����쭮� ���祭��
endlocal
echo ����㦨 �����쭮� ������ V1 = %V1% & REM ��� ����砥� ������쭮� ���祭��

setlocal ENABLEDELAYEDEXPANSION & REM ��� ⮣� �⮡� ����� ����� � ���� ���祭�� ��६����� ����� �ணࠬ���� ������, �㦭� ������� ०�� �⫮������ ����⠭���� �� ���祭��. �� 㬮�砭�� ����� ��� ��६����� ����� ����� (...) ����⠢������ �� ���祭��, ����� �뫨 �� ��砫� �믮������ �⮣� �����. �᫨ �� �㦭� ������� ���� ���祭��, � �� ����祭��� �⫮������ ����⠭���� �㦭� �ᯮ�짮���� ��ࠬ���騥 ᨬ���� !! ����� %%
( set V1=����� ���祭��
  set V2=%V1%
  set V3=!V1!
  echo ����� ����� � V2 ���祭�� !V2! & REM ��� ����砥� ��஥ ���祭��
  echo ����� ����� � V3 ���祭�� !V3! & REM ��� ����砥� ����� ���祭��
)
echo ����㦨 ����� � V3 ���祭�� %V3% & REM ����㦨 ����� �������-� ����� �ᯮ�짮���� ����� ��ࠬ���騥 ᨬ���� %%
endlocal

REM ����⠭���� ᮤ�ন���� ��६����� � ��� �ணࠬ�� ��� �믮������
set PINGER1=ping 127.0.0.1 -n 1
%PINGER1% & REM �㤥� �믮����� ��������, ⥪�� ���ன ��࠭�� � ��६�����. ����� ᫮��� ���������� �������樨 ����� ��࠭��� � 䠩� � �맢��� ��������� call

REM ���� ������ � ��६����
Set /P VARSTR=������ ⥪��: & REM ����� ���짮��⥫� ����� ��ப� ⥪��. ��������� � ���������� ��ப� ��������� � ��६����� VARSTR

    REM ***************************************
    REM  ������ � ����������� (��������������)  
    REM ***************************************

    REM ��楤�� - ���� �ணࠬ��, ���஬� ����� ��।������� ��� �� ��।������� �� �室 ��㬥���, �� ����� (� �⫨稥 �� �㭪樨 � ������᪨�   �몠� �ணࠬ��஢����) �� �����頥� ���祭��, � ���� ᮢ��蠥� ����� ������ ����⢨� (����/�뢮�, ��������� ���祭�� ��������� ��६����� � �.�.).

REM �᫨ ��楤�� ������� � ��砫� ��� �।��� �ਯ�, � �⮡� ��� �� �믮������� ᠬ� �� ᥡ� ��। ��� �⠢���� ���室 �� ���� ��᫥ ������� ��楤���. �᫨ ��� ������ � ���� �ਯ�, � ��। �� �������� ����� ���� �������� ࠡ��� �ਯ� ��������� exit ��� goto :eof
goto :contin2 
    REM ��� ��楤��� ������� ���筮� ��⪮�. 
    :proc1 
        echo �믮������ ��楤�� proc1 & REM ����� ⥫� ��楤��� (� ������ ��砥 - �뢮� ��������樮����� ᮮ�饭��)
    exit /b & REM �� ������� �����蠥� �믮������ ��楤��� � ������ ������ �ᯮ������ � ���, �� ���ன ��楤�� �뫠 �맢���.

    :proc2 
        REM ���祭�� ��㬥�⮢, ��।����� � ��楤���, ����� ����⠢���� � ������� �ᯮ���� ᯥ樠��� ��६���� %1 %2 %3 � �.�.
        set ARGDEMO=���� ��㬥�� ࠢ�� %1, ��ன ��㬥�� ࠢ�� %2, � ��⨩ - %3.
    exit /b
:contin2

    REM ********************
REM �맮� ��楤��� ��� ��㬥�⮢ (�������祭 ���⮬� �맮�� ��㣮�� �ਯ�)
call :proc1
REM ��।�� ��㬥�⮢ � ��楤��� (��� ��㣮� �ਯ�). �� ⥪�⮢� ��ப�, ࠧ������� �஡�����. �᫨ �㦭� � ᠬ�� ��㬥�� �ᯮ�짮���� �஡���, � ⥪�� ��ப� �㦭� �������� � ������ ����窨:
call :proc2 ������ 2018 "���⮢�� ��ப�"
echo %ARGDEMO%& REM �ᮡ�������: ��६����, ��᢮���� ����� ��楤��� (���譥�� �ਯ�) �� ����� ������묨 � ����㯭� ��᫥ �� �믮������. � ����� ����� ���� ������ ���祭��, ����� � ��� �뫨 �� �맮�� ��楤���.


    REM ********************
    REM  ������ � ���������   
    REM ********************

    REM �㭪�� - �� ���� �ணࠬ��, ����� �୨���� �� �室 ��㬥��� � �����頥� ����� ���祭�� (��� ���祭��). � BAT-�ਯ�� �㭪樨 �� �।�ᬮ�७�. �� ���-⠪�  (������ ��������� ��������� ��६�����) ���祭�� ����� "��������" ���� ������ ⥪�� � �⠭���⭮� ���ன�⢮ �뢮��, ���� �१ ��।��� 32-��⭮�� �᫮���� ���祭�� �訡��. � ��ࢮ� ��砥 �ॡ���� ����� �㭪樨 �� ���譥�� 䠩��. ��� 㤮��⢠ ��᪮�쪮 �㭪権 ��ꥤ����� � ����� ���譥� �ਯ� batch-begin-lib.bat

set STRING1=test & REM ��������樮���� ��६�����, ����� �㤥� ���������� �� �室 �㭪樨
REM ��� ��࠭���� �����饭���� �㭪樥� ���祭�� � ����� ��६����� �㦭� ��ᯮ�짮������ �������樥� ��� ��ࠡ�⪨ १���⮢ ࠡ��� ������. � ����⢥ ������� �ᯮ������ ��� ���譥�� �ਯ� � ��㬥��� ����᪠ (��� �㭪樨 � ��।������� ��ப�), �����祭�� � ������� ����窨:
for /f "delims=" %%A in ('batch-begin-lib.bat func1 %STRING1%') do set STRING2=%%A& REM �㭪�� �ਭ����� �� �室 STRING1 � �����頥� STRING2
echo �㭪�� �����頥� %STRING2%

REM ����� ���⪨� ��ਠ�� ������ ���祭�� - �१ 㪠����� � �맮�� �㭪樨 ����� ��६���� ��� ��࠭����. �� ⠪�� 㤮��� ⥬, �� �㭪�� ����� �� �뭮��� � �⤥��� �ਯ�:
call batch-begin-lib.bat func1 %STRING1% STRING3 > nul
echo ����ୠ⨢�� ������ ���祭��: %STRING3%


goto :contin3 
    REM �㭪�� ���������� � ������ �����頥� �᫮ �१ ��� �訡�� (㪠�뢠��� � ������� exit)
    :sqr [�᫮ ���஥ �㦭� ������� � ������]
        REM ��� ����來��� ������� ��᫥ ����� ��⪨ � �������� ᪮���� 㪠����, �� ������ ���� ��।��� � ��㬥���
        setlocal
        set /a RESULT=%1*%1
    endlocal & exit /b %RESULT% & REM ������ � ���� ��ப� �������� ����⠢��� �����쭮� ���祭�� ��६����� RESULT. � ᫥���饩 ��ப� ��᫥ endlocal �㤥� 㦥 ���������� ������쭮� ���祭��.
:contin3

echo RESULT = %RESULT% & REM �㭪�� �� ��१���ᠫ� ��६�����, �� �祭� ��� � ����� ����� �㭪樨 (������⢨� ������� ��䥪⮢)
call :sqr 7 & REM ����� �㭪樨
echo ������� ࠡ��� �㭪樨 SQR = %ERRORLEVEL% & REM 32-��⭮� 楫�� �᫮ � १���⮬ �㭪樨 ��࠭��� � ��⥬��� ��६����� ERRORLEVEL

    REM ******************************************
    REM  ����������� ��������� � ������ ���������  
    REM ******************************************

REM �᫮��� � ����� �����
if Str1==Str1 set RESULT=yes
REM ������ � ��᪮�쪮 ��ப
if Str1==Str1 ( 
  set RESULT=yes
)

REM �᫮��� � ���� ���ﬨ
if Str1==Str1 set RESULT=yes else RESULT=no
REM ������ � ��᪮�쪮 ��ப
if Str1==Str1 ( 
  set RESULT=yes
) else (
  set RESULT=no
)

REM �࣠������ ४��ᨨ �ᯮ���� ��⢫���� �� �᫮���:
goto :contin4
    REM �㭪�� ���᫥��� 䠪�ਠ��
    :factorial
        setlocal
        if not %1 GEQ 0 exit /b 0 & REM �஢��塞 �⮡� �� �室� �뫮 ������⥫쭮� �᫮, �᫨ ��� � ����� �� ��室 0
        if %1==0 exit /b 1
        if %1==1 exit /b 1
        set /A PREVNUMB=%1-1 
        call :factorial %PREVNUMB% 
        set /A RESULT = %1 * %ERRORLEVEL%
    endlocal & exit /b %RESULT%
:contin4
call :factorial 10 & REM ��뢠�� �㭪�� ���᫥��� 䠪�ਠ��
echo Factorial 10 = %ERRORLEVEL%

REM �࣠������ ४��ᨨ � �ᯮ����⥫쭮� �㭪樥� ��� �࠭���� �஬����筮�� ���祭��:
goto :contin5 
    REM �㭪�� �஢�ન �᫠ �� ������. 1 == true, 0 == false, -1 == error
    :prime
        if %1 LEQ 0 exit /b -1
        if %1 GTR 0 call :prime_ %1 2 
    exit /b %ERRORLEVEL%

    REM �ᯮ����⥫쭠� �㭪�� ��� �࠭���� � �ᯮ�짮����� �஬����筮�� ���祭�� (�� ������ �᫠ �ந������� �஢�ઠ)
    :prime_
    setlocal ENABLEDELAYEDEXPANSION & set /a DOUBLE = %2 * %2
        if %1 LEQ 0 exit /b -1
        if %DOUBLE% GTR %1 ( set RESULT=1 
            ) else ( set /a MOD = %1 %% %2 
            if !MOD! EQU 0 ( set RESULT = 0
                ) else ( set /a NEXT = %2 + 1
                call :prime_ %1 !NEXT! ))
    endlocal & exit /b %RESULT%
:contin5
setlocal ENABLEDELAYEDEXPANSION & echo ����� �᫠:
for /L %%I in (0,1,100) do ( call :prime %%I
    if !ERRORLEVEL!==1 <Nul set /P $V=%%I )  
endlocal & echo.


    REM *******
    REM  �����  
    REM *******

echo ��������� 横� - �뢮� �ᥫ �� 30 �� 40 (� 蠣�� 2): 
for /L %%I in (30,2,40) do echo %%I
echo ����, ����� ���ண� �������� ��६���� (���᫥��� 䠪�ਠ��):
setlocal ENABLEDELAYEDEXPANSION
set FACTORIAL=1
for /L %%I in (2,1,10) do ( 
    set /a FACTORIAL = !FACTORIAL! * %%I
)
echo ����ਠ� 10! = %FACTORIAL%
endlocal

REM �������� 横�
echo �⮡ࠦ��� ⠡���� ᫮�����:
setlocal ENABLEDELAYEDEXPANSION
for /L %%I in (1,1,5) do ( 
    for /L %%J in (1,1,5) do (   
        set /A SUMM = %%I + %%J
        <Nul set /P $V=!SUMM! 
    ) 
    echo.
) 
endlocal
 
REM ��㣨� ���� 横��� ॠ�������� �१ ������ goto ���� ४����

pause
exit
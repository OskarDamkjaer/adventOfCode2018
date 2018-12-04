program dayone
integer, parameter :: last=1016
real :: dat(last)
real :: total

open(1,file='inputs/dayone')
do i=1,last
    read(1,*) dat(i)
    total = total + dat(i)
end do
close(1)

print *, "Part one is:"
print *, int(total)
end program dayone
